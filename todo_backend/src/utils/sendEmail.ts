import nodemailer from "nodemailer";

export const sendOTPEmail = async (email: string, otp: string) => {
  // If environment variables missing, fallback to console
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("EMAIL_USER or EMAIL_PASS not set. OTP will be logged instead.");
    console.log(`DEV OTP for ${email}: ${otp}`);
    return;
  }

  try {
    // Create transporter for Gmail using App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // must be App Password if 2FA enabled
      },
    });

    // Define email options
    const mailOptions = {
      from: `"Todo app" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: sans-serif; text-align: center;">
          <h2>Your OTP is: <span style="color: #0070f3;">${otp}</span></h2>
          <p>It is valid for 5 minutes</p>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}: ${otp}`);
    console.log("Message ID:", info.messageId);

  } catch (error: any) {
    // Log detailed error but don't throw in dev
    console.error("Email send error:", error);
    if (error.response) console.error("Response:", error.response);
    if (error.message) console.error("Message:", error.message);

    // Fallback: log OTP so frontend can proceed
    console.log(`FALLBACK OTP for ${email}: ${otp}`);
  }
};
