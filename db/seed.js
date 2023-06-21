const bcrypt = require("bcrypt")
const saltRounds = 10

const seedUsers = async (client) => {
  const query = `INSERT INTO users (first_name, last_name, email, password, job_title) 
  VALUES ($1, $2, $3, $4, $5)`
  const passwordHash = bcrypt.hashSync("password", saltRounds)
  const p1 = client.query(query, [
    "param",
    "singh",
    "1@test.com",
    passwordHash,
    "tech",
  ])
  const p2 = client.query(query, [
    "justin",
    "smith",
    "2@test.com",
    passwordHash,

    "Salesmen",
  ])
  const p3 = client.query(query, [
    "harry",
    "yadav",
    "3@test.com",
    passwordHash,

    "Technician",
  ])

  await Promise.all([p1, p2, p3])
}

const seedResidents = async (client) => {
  const query = `INSERT INTO residents (resident_address, first_name, last_name, type, unit) VALUES ($1, $2, $3, $4, $5)`
  const p1 = client.query(query, [
    "4533 west 18th street, Los Angeles, CA",
    "Param",
    "Singh",
    "Home",
    "0",
  ])
  const p2 = client.query(query, [
    "4533 w 18th St. Los Angeles, CA",
    "Kai",
    "Matsukuma",
    "Home",
    "0",
  ])
  const p3 = client.query(query, [
    "4533 18th St. Los Angeles, CA",
    "justin",
    "smith",
    "Apartment",
    "1/2",
  ])
  await Promise.all([p1, p2, p3])
}

const seedReviews = async (client) => {
  const query = `INSERT INTO reviews (review_user_id_fkey, review_resident_id_fkey, payment, rating, visit_type, review) VALUES ($1, $2, $3, $4, $5, $6)`
  const p1 = client.query(query, [
    2,
    1,
    1,
    4,
    "Service Call",
    "Good client, adf adf adfdafdfdf adfa afdfdf as adfadf afasfebty casdrg",
  ])
  const p2 = client.query(query, [
    2,
    1,
    1,
    4,
    "Service Call",
    "Good client, adf adf adfdafdfdf adfa afdfdf as adfadf afasfebty casdrg",
  ])
  const p3 = client.query(query, [
    2,
    1,
    1,
    4,
    "Service Call",
    "Good client, adf adf adfdafdfdf adfa afdfdf as adfadf afasfebty casdrg",
  ])
  await Promise.all([p1, p2, p3])
}

const seedLikes = async (client) => {
  const query = `INSERT INTO likes (like_review_id_fkey, like_user_id_fkey) VALUES ($1, $2)`
  const p1 = client.query(query, [1, 1])
  const p2 = client.query(query, [1, 2])
  const p3 = client.query(query, [2, 1])
  const p4 = client.query(query, [2, 2])
  const p5 = client.query(query, [1, 1])
  await Promise.all([p1, p2, p3, p4, p5])
}

module.exports = {
  seedUsers,
  seedResidents,
  seedReviews,
  seedLikes,
}
