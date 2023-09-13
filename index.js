const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 3000
const morgan = require("morgan")
const helmet = require("helmet")
const cors = require("cors")
const uploadImage = require("./middleware/uploadImage")
const req = require("express/lib/request")
const checkIfAuth = require("./middleware/isAuth")
const convertToSnakeCase = require("./middleware/toSnakeCase")
const convertToCamelCase = require("./middleware/toCamelCase")
require("./db/pg")
// removes -x-powered-by response header
// app.disable("x-powered-by")
app.use(helmet())
app.use(cors({ allowedHeaders: "Content-Type, Authorization" }))

// Cant use express.json for multipart form type for image upload. Use Multer
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("tiny"))

/**
 * With mutler, we get req.files and req.body.
 */
app.use(convertToSnakeCase)
app.use(convertToCamelCase)
/**
 * Routers and Middleware
 */
// TODO fix all routes
const authRouter = require("./controllers/auth")
const userRouter = require("./controllers/user")
const addressRouter = require("./controllers/address")
const residentRouter = require("./controllers/resident")
const reviewRouter = require("./controllers/review")
const feedbackRouter = require("./controllers/feedback")
const likeRouter = require("./controllers/like")
app.use("/api/auth", authRouter)
app.use("/api/addresses", addressRouter)
app.use("/api/residents", residentRouter)
app.use("/api/reviews", reviewRouter)
app.use("/api/users", userRouter)
app.use("/api/feedback", feedbackRouter)

/**
 * Handles all failed routing that do not match or Auth is not met
 */
app.use((req, res) => {
  res.status(404).json({ message: "error", data: "Not Found - 400" })
})
app.use((err, req, res, next) => {
  if (err.code === "invalid_token") {
    console.log("got bad token")
    return res
      .status(401)
      .json({ message: "error", data: "Please log in to Eval." })
  }
  return res.status(500).json({
    message: "error",
    data: `500-Error with the server, try again. ${err.message}`,
  })
})

// this will only run if we are testing it. Check Package JSON file for testing script
if (process.env.NODE_ENV === "test") {
  // TODO
  // setup Testing Controller
  // Setup testing router
}

app.listen(process.env.PORT, () => {
  console.log("server is running", process.env.PORT)
})
