const nodemailer = require("nodemailer")

const NodemailerTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL_ADDRESS}`,
    pass: `${process.env.EMAIL_PASSWORD}`,
  },
})

module.exports = NodemailerTransporter
