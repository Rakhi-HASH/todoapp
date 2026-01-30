import nodemailer from "nodemailer";

export const sendOTPEmail = async (email: string, otp: string) => {
  try {

    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_HOST,
      port: Number(process.env.BREVO_SMTP_PORT),
      secure: false, // TLS
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Todo App" <${process.env.BREVO_SENDER_EMAIL}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: sans-serif; text-align: center;">
          <h2>Your OTP is: <span style="color:#0070f3;">${otp}</span></h2>
          <p>It is valid for 5 minutes</p>
        </div>
      `,
    });

    console.log("✅ OTP sent to:", email);

  } catch (error) {
    console.error("❌ Brevo SMTP email error:", error);
    throw error;
  }
};
