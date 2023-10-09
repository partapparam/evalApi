const adminRouter = require("express").Router()
const db = require("../db/pg")

const getAllUsers = `SELECT email, user_id, first_name, last_name, created_at, job_title, industry FROM users`

const getAllResidents = `SELECT * FROM residents`
const getAllReviews = `SELECT r.*, u.first_name as reviewer_first_name, u.last_name as reviewer_last_name, d.first_name as resident_first_name, d.last_name as resident_last_name 
FROM review r
JOIN users u ON r.review_user_id_fkey = u.user_id
JOIN residents d ON r.review_resident_id_fkey = d.resident_id
`

adminRouter.get("/users", async (req, res) => {
  try {
    const users = await db.query(getAllUsers)
    return res.json({ message: "success", data: users.rows })
  } catch (error) {
    console.error(error)
    return res.json({ message: "error", data: error })
  }
})

adminRouter.get("/reviews", async (req, res) => {
  try {
    const reviews = await db.query(getAllReviews)
    return res.json({ message: "success", data: reviews.rows })
  } catch (error) {
    console.error(error)
    return res.json({ message: "error", data: error })
  }
})

adminRouter.get("/residents", async (req, res) => {
  try {
    const residents = await db.query(getAllResidents)
    return res.json({ message: "success", data: residents.rows })
  } catch (error) {
    console.error(error)
    return res.json({ message: "error", data: error })
  }
})
