// utils/sendOTPEmail.ts
const axios = require("axios");

export const sendOTPEmail = async (email: string, otp: string) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Todo App",
          email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [{ email }],
        subject: "Your OTP Code",
        html: `
          <div style="font-family: sans-serif; text-align:center;">
            <h2>Your OTP is: <span style="color:#0070f3;">${otp}</span></h2>
            <p>It is valid for 5 minutes</p>
          </div>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ OTP sent to:", email);
  } catch (error) {
    console.error("❌ Brevo API error:", error);
    throw new Error("Failed to send OTP email");
  }
};
