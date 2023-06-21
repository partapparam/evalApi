const residentRouter = require("express").Router()
const db = require("../db/pg")
const checkIfAuth = require("../middleware/isAuth")

/**
 * Queries
 */
// get Residents for Address
const getResidentsQuery = `SELECT r.*, ROUND(AVG(d.rating), 1) as rating, ROUND(AVG(d.payment), 1) as payment, ROUND(AVG(d.patient), 1) as patient, ROUND(AVG(d.friendly), 1) as friendly, ROUND(AVG(d.respectful), 1) as respectful, COUNT(d.*) as total_reviews
FROM residents r
JOIN reviews d ON d.review_resident_id_fkey = r.resident_id
WHERE r.resident_address = $1
GROUP BY r.resident_id`
// Create new Resident at Address using address_id
const newResidentQuery = `INSERT INTO residents (resident_address, first_name, last_name, type, unit) VALUES ($1, $2, $3, $4, $5) RETURNING *`

residentRouter.post("/", checkIfAuth, async (req, res) => {
  const resident = req.body.resident
  try {
    const savedResident = await db.query(newResidentQuery, [
      resident.address,
      resident.first_name,
      resident.last_name,
      resident.type,
      resident.apt,
    ])
    return res.json({ message: "success", data: savedResident.rows[0] })
  } catch (error) {
    console.log("Error creating new resident", error)
    return res.json({ message: "error", data: error })
  }
})

residentRouter.get("/", async (req, res) => {
  const addressId = req.query.address
  try {
    const residents = await db.query(getResidentsQuery, [addressId])
    return res.json({ message: "success", data: residents.rows })
  } catch (error) {
    console.log("error getting all residents", error)
    return res.json({ message: "error", data: error })
  }
})

module.exports = residentRouter
