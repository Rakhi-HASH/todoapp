import { Request, Response } from "express";
import Otp from "../models/Otp";
import User from "../models/User";
import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const normalizedEmail = email.toLowerCase();

    const record = await Otp.findOne({ email: normalizedEmail });

    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (record.expiresAt < new Date()) {
      await Otp.deleteOne({ email: normalizedEmail });
      return res.status(400).json({ message: "OTP expired" });
    }

    if (record.otp !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = await User.findOne({ email: normalizedEmail });

    const token = generateToken(user!._id.toString());

    await Otp.deleteOne({ email: normalizedEmail });

    return res.json({
      _id: user!._id,
      name: user!.name,
      email: user!.email,
      token,
    });

  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    return res.status(500).json({ message: "OTP verification failed" });
  }
};
