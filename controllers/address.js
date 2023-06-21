const addressRouter = require("express").Router()
const db = require("../db/pg")

// TODO how does default values work if null is passed into query

/**
 * Address Queries
 * New Address
 * Get Address - Join residents for address and reviews (Reviewer, Total Likes for Review, and Resident for Review) for address
 * Get All Addresses
 */
const newAddressQuery = `INSERT INTO addresses (street_address, zipcode, address_type, unit) VALUES ($1, $2, $3, $4) RETURNING *`
const getAddressQuery = `SELECT addresses.*, reviews.*, residents.first_name as resident_first_name, residents.last_name as resident_last_name, users.username as reviewer_username, (SELECT count(*) from likes WHERE reviews.review_id = likes.like_review_id_fkey) as likes
FROM addresses
JOIN reviews ON addresses.address_id = reviews.review_address_id_fkey
JOIN residents ON reviews.review_resident_id_fkey = residents.resident_id
JOIN users ON reviews.review_user_id_fkey = users.user_id
WHERE addresses.address_id = $1`
const getAllAddressesQuery = `SELECT * FROM addresses`

addressRouter.get("/:id", async (req, res) => {
  const addressId = req.params.id
  try {
    const addr = await db.query(getAddressQuery, [addressId])
    return res.json({ message: "success", data: addr.rows })
  } catch (error) {
    console.log(error)
    return res.json({ message: "error", data: error })
  }
})

addressRouter.get("/", async (req, res) => {
  try {
    const addresses = await db.query(getAllAddressesQuery)
    return res.json({ message: "success", data: addresses.rows })
  } catch (error) {
    console.log("error getting all addresses", error)
    return res.json({ message: "error getting all addresses" })
  }
})

addressRouter.post("/new", async (req, res) => {
  const body = req.body
  try {
    const savedAddress = await db.query(newAddressQuery, [
      body.street_address,
      body.zipcode,
      body.address_type,
      body.unit || null,
    ])
    return res.json({ message: "success", data: savedAddress.rows[0] })
  } catch (error) {
    console.log("error saving address")
    return res.json({ message: "error", data: error })
  }
})

module.exports = addressRouter
