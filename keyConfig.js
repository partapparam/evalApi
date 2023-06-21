const fs = require("fs")
const secretKey = fs.readFileSync("./jwtRS256.key")
const publicKey = fs.readFileSync("./jwtRS256.key.pub")

module.exports = { secretKey, publicKey }
