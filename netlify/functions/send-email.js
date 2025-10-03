const { Resend } = require("resend");

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to parse URL-encoded form data
function parseFormData(body) {
  const params = new URLSearchParams(body);
  const formData = {};

  for (const [key, value] of params) {
    formData[key] = value;
  }

  return formData;
}

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Parse the URL-encoded form data
    const formData = JSON.parse(event.body);
    const {
      fullName,
      email,
      phone,
      city,
      selfChild,
      selfAge,
      selfGender,
      childName,
      childAge,
      childGender,
      dayTime,
      conflict,
      payment,
      insuranceProvider,
      questions,
    } = formData;

    // Create HTML content with all form fields
    const htmlContent = `
      <h2>New Waitlist Form Submission</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Therapy for:</strong> ${selfChild}</p>
      ${
        selfChild === "self"
          ? `
        <p><strong>Age:</strong> ${selfAge || "Not provided"}</p>
        <p><strong>Gender:</strong> ${selfGender || "Not provided"}</p>
      `
          : ""
      }
      ${
        selfChild === "child"
          ? `
        <p><strong>Child's Name:</strong> ${childName || "Not provided"}</p>
        <p><strong>Child's Age:</strong> ${childAge || "Not provided"}</p>
        <p><strong>Child's Gender:</strong> ${childGender || "Not provided"}</p>
      `
          : ""
      }
      <p><strong>Can do daytime appointments:</strong> ${dayTime}</p>
      <p><strong>Reason for therapy:</strong> ${conflict}</p>
      <p><strong>Payment method:</strong> ${payment}</p>
      ${payment === "insurancePay" ? `<p><strong>Insurance Provider:</strong> ${insuranceProvider || "Not provided"}</p>` : ""}
      <p><strong>Additional Questions:</strong> ${questions || "None"}</p>
    `;

    // Send email using Resend (same as your original code)
    const data = await resend.emails.send({
      from: "requests@guidedpathcenter.com",
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
