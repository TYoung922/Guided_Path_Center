const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to serve static files
app.use(express.static(__dirname + "/public"));

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/meet.html");
});

const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-email", async (req, res) => {
  const {
    fullName,
    email,
    phone,
    city,
    selfChild,
    dayTime,
    conflict,
    payment,
    questions,
  } = req.body;

  const htmlContent = `
    <h2>New Waitlist Form Submission</h2>
    <p><strong>Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>City:</strong> ${city}</p>
    <p><strong>Therapy for:</strong> ${selfChild}</p>
    <p><strong>Can do daytime appointments:</strong> ${dayTime}</p>
    <p><strong>Reason for therapy:</strong> ${conflict}</p>
    <p><strong>Payment method:</strong> ${payment}</p>
    <p><strong>Additional Questions:</strong> ${questions}</p>
  `;

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // This must be verified in your Resend account
      // to: ["bethany@guidedpathcenter.com"],
      to: ["thyoung89@gmail.com"],
      subject: "New Waitlist Form Submission",
      html: htmlContent,
    });

    res.send("Email sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while sending email: " + error);
  }
});

// Handle form submission
// app.post("/send-email", (req, res) => {
//   const { fullName, email, phone, selfChild, service, conflict, payment } =
//     req.body;

// Create a transporter object using SMTP transport
// const transporter = nodemailer.createTransport({
//   service: "hotmail",
//   auth: {
//     user: process.env.email_user,
//     pass: process.env.email_pass,
//   },
// });

// const mailOptions = {
//   from: "orickteen@hotmail.com",
//   to: "thyoung89@gmail.com",
//   subject: "New Form Submission",
//   text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nWho is it for: ${selfChild}\nServices Wanted: ${service}\nConflicts: ${conflict}\nHow will you pay: ${payment}`,
// };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return res.status(500).send("Error while sending email: " + error);
//     }
//     res.send("Email sent successfully!");
//   });
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
