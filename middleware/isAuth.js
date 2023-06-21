const { expressjwt: jwt } = require("express-jwt")
const { publicKey } = require("../keyConfig")
const db = require("../db/pg")
const js = require("jsonwebtoken")

/**
 * Gets Auth Bearer Token from the request
 * Attaches it
 */
const getTokenFromHeader = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1]
    return token
  }
}

const checkIfAuth = jwt({
  algorithms: ["RS256"],
  secret: publicKey,
  getToken: getTokenFromHeader,
  onExpired: async (req, res, err) => {
    // throw new Error("Token Expired")
    return
  },
})

module.exports = checkIfAuth
