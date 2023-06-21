const { Pool } = require("pg")
const connectionString = process.env.POSTGRES_DB

if (!connectionString) {
  console.log("No connection String")
  process.exit(-1)
}

// create new pool
const pool = new Pool({ connectionString })
// check for any errors on the clients in the backend
pool.on("error", (err, client) => {
  console.error("error on pg pool", err)
  process.exit(-1)
})

module.exports = {
  query: (query = "", values = []) => {
    return pool.query(query, values)
  },
  client: () => {
    return pool.connect()
  },
}
