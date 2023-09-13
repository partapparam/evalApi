const nodemailer = require("nodemailer")

const NodemailerTransporter = nodemailer.createTransport({
  name: "www.eval-app.com",
  host: "box2001.bluehost.com",
  port: 465,
  secure: true,
  debug: true,
  auth: {
    user: `${process.env.EMAIL_ADDRESS}`,
    pass: `${process.env.EMAIL_PASSWORD}`,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

module.exports = NodemailerTransporter
