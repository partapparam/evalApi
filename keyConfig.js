const fs = require("fs")
let secretKey, publicKey

/**
 * Use in Dev mode
 */
if (process.env.NODE_ENV === "development") {
  secretKey = fs.readFileSync("./jwtRS256.key")
  publicKey = fs.readFileSync("./jwtRS256.key.pub")
}

/**
 * Use in Production mode
 */
if (process.env.NODE_ENV === "production") {
  secretKey = process.env.JWT_SECRET_KEY
  publicKey = process.env.JWT_PUBLIC_KEY
}

module.exports = { secretKey, publicKey }
