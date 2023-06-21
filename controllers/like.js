const likeRouter = require("express").Router()
const db = require("../db/pg")
const checkIfAuth = require("../middleware/isAuth")

// TODO - what is best way to send server requests so not to slow down front end

/**
 * Create new Like
 * Requires review_id and user_id
 */
const newLikeQuery = `INSERT INTO likes (like_review_id_fkey, like_user_id_fkey) VALUES ($1, $2)`
likeRouter.post("/reviews/:id/like", checkIfAuth, async (req, res) => {
  const reviewId = req.params.id
  const user = req.auth.user_id
  try {
    const savedLike = await db.query(newLikeQuery, [reviewId, user.id])
    return res.json({ message: "success", data: savedLike })
  } catch (error) {
    console.log("error saving Like")
    return res.json({ message: "error", data: error })
  }
})

// erase like/delete = need review id and user id to verify
/**
 * Delete Like
 * Requires User performing DELETE to be Like User ID FKEY
 *
 * All Likes will be deleted if REVIEW or USER is DELETED
 */
const deleteLikeQuery = `DELETE FROM likes 
WHERE likes.like_review_id_fkey = $1 
AND likes.like_user_id_fkey = $2`
likeRouter.delete("/reviews/:id/like", async (req, res) => {
  const reviewId = req.params.id
  const user = req.auth.user_id
  try {
    const deleted = await db.query(deleteLikeQuery, [reviewId, user.id])
    return res.json({ message: "success", data: "Like deleted" })
  } catch (error) {
    console.log("error on 271 deleting like")
    return res.json({ message: "error deleting like", data: error })
  }
})

/**
 * Get all Reviews Liked by User
 * Join Review Address, Review User as Reviewer, Review Resident, and total
 * Likes for Review
 */
const getLikedReviewsQuery = `SELECT l.*, r.*, a.*, 
u.username AS reviewer_username, 
d.first_name AS resident_first_name, 
d.last_name AS resident_last_name 
FROM likes l
JOIN reviews r ON l.like_review_id_fkey = r.review_id
JOIN addresses a ON r.review_address_id_fkey = a.address_id 
JOIN users u ON r.review_user_id_fkey = u.user_id
JOIN residents d ON r.review_resident_id_fkey = d.resident_id
WHERE l.like_user_id_fkey = $1 `

likeRouter.get("/users/:id/reviews/liked", checkIfAuth, async (req, res) => {
  const userId = req.params.id
  try {
    const liked = await db.query(getLikedReviewsQuery, [userId])
    return res.json({ message: "success", data: liked.rows })
  } catch (error) {
    console.log("error getting liked reviews")
    return res.json({ message: "error", data: error })
  }
})

module.exports = likeRouter
