const feedbackRouter = require("express").Router()
const NodemailerTransporter = require("../config/nodemailer")

feedbackRouter.post("/", async (req, res) => {
  const mailOptions = {
    from: `"Eval ${process.env.EMAIL_ADDRESS}`,
    to: `psingh10287@gmail.com`,
    subject: "New Feedback",
    html: `<div><h2>User: ${req.body.email}</h2> gave us feedback: <p>${req.body.feedback}</p></div>`,
  }

  NodemailerTransporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error("There was an error", err)
      return res.json({ message: "error", data: "Could not send feedback" })
      // throw Error("Could not send feedback")
    } else {
      console.log("email sent")
      return res
        .status(200)
        .json({ message: "success", data: "Email is sent, check log" })
    }
  })
})

module.exports = feedbackRouter
