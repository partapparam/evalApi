const fs = require("fs")
const secretKey = process.env.JWT_SECRET_KEY
const publicKey = process.env.JWT_PUBLIC_KEY

module.exports = { secretKey, publicKey }
