const jwt = require("jsonwebtoken")
const { secretKey } = require("../keyConfig")
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const authRouter = require("express").Router()
const bcrypt = require("bcrypt")
const db = require("../db/pg")


/**
 * Queries
 */

const signupQuery = `INSERT INTO users (first_name, last_name, email, password, job_title, profile_photo) 
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *`
const validateQuery = `SELECT * FROM users WHERE email = $1`
const getPasswordResetTokenQuery = `SELECT * FROM users WHERE reset_password_token = $1`
const updateResetPasswordTokenQuery = `UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE user_id = $3`

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
    ])
    // remove password from response
    delete response.rows[0].password
    delete response.rows[0].updated_at
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

authRouter.post('/forgotPassword', (req, res) => {
    if (req.body.email === '') {
      res.status(400).send('email required');
    }
  console.error(req.body.email)
  // Get User from DB to ensure email exists
  const response = await validate(req.body.email)
    const user = response.rows[0] 
    
      if (user === null) {
        console.error('email not in database');
        res.status(403).send('email not in db');
      } else {
        const token = crypto.randomBytes(20).toString('hex');
        user.update({
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000,
        });

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
          },
        });

        const mailOptions = {
          from: 'mySqlDemoEmail@gmail.com',
          to: `${user.email}`,
          subject: 'Link To Reset Password',
          text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
            + `http://localhost:3031/reset/${token}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        };

        console.log('sending mail');

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            res.status(200).json('recovery email sent');
          }
        });
      }
    });
  });
};

module.exports = authRouter
