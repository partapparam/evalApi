const { Client } = require("pg")
const seed = require("./seed")
require("dotenv").config()
const client = new Client()

/**
 * Add Reset Password Token and Token Expiration on the User Table
 */
const createScript = `
ALTER TABLE users 
ADD reset_password_token VARCHAR(30) NULL,
ADD reset_password_expires INT NULL
;
`

client.connect(async (err) => {
  if (err) {
    return console.error("could not connect to postgres", err)
  }
  try {
    console.log("creating scripts")

    await client.query(createScript)
  } catch (err) {
    console.log("recieved error---", err)
    process.exit(1)
  } finally {
    //   release client
    client.end()
  }
})
