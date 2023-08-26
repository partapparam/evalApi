const { Client } = require("pg")
const seed = require("./seed")
require("dotenv").config()
const client = new Client()

/**
 * Add Reset Password Token and Token Expiration on the User Table
 */
const createScript = `
ALTER TABLE users 
ADD industry VARCHAR(30) NOT NULL,
ADD accepted_terms_and_conditions INT NOT NULL DEFAULT 0
;
`

client.connect(async (err) => {
  if (err) {
    return console.error("could not connect to postgres", err)
  }
  try {
    console.log("creating scripts")

    await client.query()
  } catch (err) {
    console.log("recieved error---", err)
    process.exit(1)
  } finally {
    //   release client
    client.end()
  }
})
