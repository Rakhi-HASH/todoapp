// utils/sendOTPEmail.ts
const axios = require("axios");

export const sendOTPEmail = async (email: string, otp: string) => {
  try {
    // Brevo API requires htmlContent or textContent
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Todo App",
          email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [{ email }],
        subject: "Your OTP Code",
        htmlContent: `
          <div style="font-family: sans-serif; text-align:center;">
            <h2>Your OTP is: <span style="color:#0070f3;">${otp}</span></h2>
            <p>It is valid for 5 minutes</p>
          </div>
        `,
        // Optional fallback for plain text email
        textContent: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 seconds timeout
      }
    );

    console.log("✅ OTP sent to:", email);
  } catch (error: any) {
    console.error("❌ Brevo API error:", error.response?.data || error.message);

    // Provide fallback OTP for dev/testing
    console.log("Fallback OTP (for testing/dev):", otp);

    // Still throw so your frontend knows OTP sending failed
    throw new Error("Failed to send OTP email. OTP is still valid for verification.");
  }
};
