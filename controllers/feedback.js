const feedbackRouter = require("express").Router()
const NodemailerTransporter = require("../config/nodemailer")

feedbackRouter.post("/", async (req, res) => {
  console.log("body: ", req.body)

  try {
    const mailOptions = {
      from: `"Eval <${process.env.EMAIL_ADDRESS}>`,
      to: `psingh10287@gmail.com`,
      subject: "New Feedback",
      html: `<div>New feedback</div>`,
    }

    NodemailerTransporter.sendMail(mailOptions, (err, response) => {
      console.log(err, response)
      if (err) {
        console.error("There was an error", err)
        throw Error("Could not send feedback")
      } else {
        console.log("email sent")
      }
    })

    return res
      .status(200)
      .json({ message: "success", data: "Email is sent, check log" })
  } catch (err) {
    return res.json({ message: "error", data: err })
  }
})

module.exports = feedbackRouter
