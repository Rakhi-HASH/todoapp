import { Request, Response } from "express";
import User from "../models/User";
import Otp from "../models/Otp";
import { generateOTP } from "../utils/generateOtp";
import { sendOTPEmail } from "../utils/sendEmail";


// ======================
// REGISTER (name + email)
// ======================
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email required" });
    }

    const normalizedEmail = email.toLowerCase();

    const exists = await User.findOne({ email: normalizedEmail });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
    });

    return res.status(201).json({
      message: "Registered successfully",
      user,
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Register failed" });
  }
};




// ======================
// LOGIN (email → send OTP)
// ======================
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: "User not registered" });
    }

    const otp = generateOTP(); // string or number

    // remove old OTPs
    await Otp.deleteMany({ email: normalizedEmail });

    // save new OTP
    await Otp.create({
      email: normalizedEmail,
      otp: String(otp), // store as string
      expiresAt: new Date(Date.now() + 1 * 60 * 1000), // 1 min
    });

    // attempt to send email
    try {
      await sendOTPEmail(normalizedEmail, String(otp));
    } catch (emailError: any) {
      console.warn(
        `Failed to send OTP email to ${normalizedEmail}. OTP will still work.`
      );
      console.warn(`Fallback OTP (for testing/dev): ${otp}`);
    }

    // always respond success, so frontend can navigate
    return res.json({
      message: "OTP generated successfully. Check email (or console in dev).",
    });

  } catch (error) {
    console.error("OTP SEND ERROR:", error);
    return res.status(500).json({ message: "OTP generation failed" });
  }
};


// ======================
// VERIFY OTP
// ======================
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const normalizedEmail = email.toLowerCase();

    const otpRecord = await Otp.findOne({ email: normalizedEmail });

    if (!otpRecord) {
      return res.status(400).json({ message: "OTP not found" });
    }

    // check expiration
    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ email: normalizedEmail });
      return res.status(400).json({ message: "OTP expired" });
    }

    // compare OTP
    if (otpRecord.otp !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP success → delete
    await Otp.deleteOne({ email: normalizedEmail });

    return res.json({
      message: "OTP verified successfully",
    });

  } catch (error) {
    console.error("OTP VERIFY ERROR:", error);
    return res.status(500).json({ message: "OTP verification failed" });
  }
};
