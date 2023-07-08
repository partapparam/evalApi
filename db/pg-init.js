/**
 * Create Postgres Tables and Seed data base
 */

const { Client } = require("pg")
const seed = require("./seed")
require("dotenv").config()
const client = new Client()

const createScript = `
CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    job_title VARCHAR(50) NOT NULL,
    profile_photo VARCHAR(150) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS residents(
    resident_id SERIAL PRIMARY KEY,
    resident_address VARCHAR(255) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    type VARCHAR(30) NOT NULL,
    unit VARCHAR(30) NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS reviews(
    review_id SERIAL PRIMARY KEY,
    review_user_id_fkey INT NOT NULL,
    review_resident_id_fkey INT NOT NULL,
    payment INT NOT NULL,
    friendly INT NOT NULL,
    respectful INT NOT NULL,
    patient INT NOT NULL,
    rating INT NOT NULL,
    review TEXT NULL,
    FOREIGN KEY (review_user_id_fkey) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (review_resident_id_fkey) REFERENCES residents(resident_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS likes(
    like_id SERIAL PRIMARY KEY,
    like_review_id_fkey INT NOT NULL,
    like_user_id_fkey INT NOT NULL,
    FOREIGN KEY (like_review_id_fkey) REFERENCES reviews(review_id) ON DELETE CASCADE,
    FOREIGN KEY (like_user_id_fkey) REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp() 
RETURNS TRIGGER AS $$ 
BEGIN 
  NEW.updated_at = NOW(); 
  RETURN NEW; 
  END; 
$$ LANGUAGE plpgsql;


CREATE TRIGGER set_timestamp 
BEFORE UPDATE ON users
FOR EACH ROW 
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp 
BEFORE UPDATE ON reviews
FOR EACH ROW 
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp 
BEFORE UPDATE ON residents
FOR EACH ROW 
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp 
BEFORE UPDATE ON likes
FOR EACH ROW 
EXECUTE PROCEDURE trigger_set_timestamp();
`

client.connect(async (err) => {
  if (err) {
    return console.error("could not connect to postgres", err)
  }
  try {
    console.log("creating scripts")
    await Promise.all([
      client.query("DROP TABLE IF EXISTS likes"),
      client.query("DROP TABLE IF EXISTS reviews"),
      client.query("DROP TABLE IF EXISTS residents"),
      // client.query("DROP TABLE IF EXISTS addresses"),
      client.query("DROP TABLE IF EXISTS users"),
    ])
    console.log("drop table finished")
    await client.query(createScript)
    // await seed.seedUsers(client)
    // await seed.seedAddresses(client)
    // await seed.seedResidents(client)
    // await seed.seedReviews(client)
    // await seed.seedLikes(client)
    // console.log("created tables")
  } catch (err) {
    console.log("recieved error---", err)
    process.exit(1)
  } finally {
    //   release client
    client.end()
  }
})
