const { Resend } = require("resend");
require("dotenv").config();

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Parse the form data
    const formData = JSON.parse(event.body);
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
    } = formData;

    // Create HTML content (same as your original code)
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

    // Send email using Resend (same as your original code)
    const data = await resend.emails.send({
      from: "requsts@guidedpathcenter.com",
      to: ["bethany@guidedpathcenter.com"],
      subject: "New Waitlist Form Submission",
      html: htmlContent,
    });

    // Return success response
    return {
      statusCode: 200,
      body: "Email sent successfully!",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: "Error while sending email: " + error.message,
    };
  }
};
