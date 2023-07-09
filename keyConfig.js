const fs = require("fs")

/**
 * Use is Dev mode
 */
// const secretKey = fs.readFileSync("./jwtRS256.key")
// const publicKey = fs.readFileSync("./jwtRS256.key.pub")

/**
 * Use is Production mode
 */
const secretKey = process.env.JWT_SECRET_KEY
const publicKey = process.env.JWT_PUBLIC_KEY

module.exports = { secretKey, publicKey }
