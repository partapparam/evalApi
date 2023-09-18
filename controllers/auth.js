const jwt = require("jsonwebtoken")
const { secretKey } = require("../keyConfig")
const crypto = require("crypto")
const authRouter = require("express").Router()
const bcrypt = require("bcrypt")
const db = require("../db/pg")
const NodemailerTransporter = require("../config/nodemailer")

/**
 * Queries
 */

const signupQuery = `INSERT INTO users (first_name, last_name, email, password, job_title, profile_photo, industry) 
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *`
const validateQuery = `SELECT * FROM users WHERE email = $1`
const getPasswordResetTokenQuery = `SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expires > $2`
const updateResetPasswordTokenQuery = `UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE user_id = $3`
const updatePasswordQuery = `UPDATE users SET password = $1 
WHERE email = $2 AND reset_password_token = $3 AND reset_password_expires > $4 RETURNING *`

/**
 * Validates that a user exists
 */
const validate = async (email) => {
  return await db.query(validateQuery, [email])
}

/**
 * Create JWT Token
 */
const createToken = (user) => {
  return jwt.sign({ userId: user.user_id }, secretKey, {
    algorithm: "RS256",
    expiresIn: 120000,
    subject: "Login details",
  })
}

/**
 * Sign up
 * Create JWT Token, send back to client along with Saved User
 */
authRouter.post("/signup", async (req, res) => {
  const user = req.body
  const saltRounds = 10
  try {
    const existingUser = await validate(user.email)
    if (existingUser.rowCount) {
      console.log(existingUser)
      throw new Error("The user already exists, please login with email")
    }
    const passwordHash = await bcrypt.hash(user.password, saltRounds)
    const response = await db.query(signupQuery, [
      user.first_name,
      user.last_name,
      user.email,
      passwordHash,
      user.job_title,
      process.env.PROFILE_PHOTO_DEFAULT,
      user.industry,
    ])
    // remove password from response
    delete response.rows[0].password
    delete response.rows[0].updated_at
    delete response.rows[0].reset_password_token
    delete response.rows[0].reset_password_expires
    // create token
    const token = createToken(response.rows[0])
    return res.json({
      message: "success",
      data: response.rows[0],
      token: token,
    })
  } catch (error) {
    console.log("signup error")
    console.log(error.message)
    res.json({ message: "error", data: error.message })
  }
})

/**
 * Login existing user or return error
 * If Success, return user and JWT Token
 */
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const response = await validate(email)
    const user = response.rows[0]
    // if No user, throw error
    if (!user) throw new Error("Email is incorrect, try again")
    const result = await bcrypt.compare(password, user.password)
    // if Password doesn't match, throw error
    if (!result) throw new Error("Incorrect password.")
    // remove user.password from response
    delete user.password
    delete user.updated_at
    delete user.reset_password_token
    delete user.reset_password_expires
    const token = createToken(user)
    return res
      .status(200)
      .json({ message: "success", data: user, token: token, expiresIn: 12000 })
  } catch (error) {
    console.log(error.message)
    return res.json({ message: "error", data: error.message })
  }
})

/**
 * Forgot Password
 * Request Token
 */

authRouter.post("/forgotPassword", async (req, res) => {
  if (req.body.email === "") {
    return res
      .status(500)
      .json({ data: "An email is required", message: "error" })
  }
  // Get User from DB to ensure email exists
  const response = await validate(req.body.email)
  const user = response.rows[0]
  try {
    if (!user) {
      console.error("email not in database")
      throw Error("There is not account with this email. ")
    }
    const token = crypto.randomBytes(20).toString("hex")
    const expires = Date.now() + 3600000
    const result = await db.query(updateResetPasswordTokenQuery, [
      token,
      expires,
      user.user_id,
    ])
    const mailOptions = {
      from: `Eval ${process.env.EMAIL_ADDRESS}`,
      to: `${user.email}`,
      subject: "Link To Reset Password",
      html: `<div>
        <h3>You are receiving this because you (or someone else) have requested the reset of the password for your account.</h3>
        <p>Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n</p>
        <a href=${process.env.CLIENT_URL}/forgotPassword/reset?token=${token}&e=${user.email}>Click here to change your password</a>\n\n</p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.\n</p>
        <a href=${process.env.CLIENT_URL}/forgotPassword/reset?token=${token}&e=${user.email}>${process.env.CLIENT_URL}/forgotPassword/reset?token=${token}&e=${user.email}</a>
        </div>`,
    }
    NodemailerTransporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error("there was an error: ", err)
        throw Error("Could not send reset email")
      } else {
        console.log("sending mail")
      }
    })
    return res
      .status(200)
      .json({ data: "Email sent with token.", message: "success" })
  } catch (error) {
    return res.status(500).json({ data: error.message, message: "error" })
  }
})

/**
 * Get Reset Token to validate request client side
 * Make sure the token exists in the DB and that it is not expired
 */
authRouter.get("/confirm/token", async (req, res) => {
  const currentTime = Date.now()
  try {
    const response = await db.query(getPasswordResetTokenQuery, [
      req.query.token,
      currentTime,
    ])
    const user = response.rows[0]
    if (!user) {
      console.error("password reset link is invalid or has expired")
      throw Error("Password reset link is expired or invalid")
    }
    return res.status(200).json({
      data: { email: user.email },
      message: "success",
    })
  } catch (error) {
    return res.json({
      data: error.message,
      message: "error",
    })
  }
})

authRouter.put("/update/passwordByEmail", async (req, res) => {
  const { password, token, email } = req.body
  console.log(req.body)
  const currentTime = Date.now()
  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const result = await db.query(updatePasswordQuery, [
      passwordHash,
      email,
      token,
      currentTime,
    ])
    console.log(result.rowCount)
    // result.rowCount returns number of rows processed by our query
    if (result.rowCount == 1) {
      console.log("row", result.rows)
      return res.status(200).json({ data: "success", message: "success" })
    } else if (result.rowCount == 0) {
      throw Error("Could not update password, the token is expired.")
    }
  } catch (err) {
    return res.json({ data: err.message, message: "error" })
  }
})

module.exports = authRouter
