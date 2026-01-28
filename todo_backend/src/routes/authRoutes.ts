import express from "express";
import { registerUser, loginUser } from "../controllers/authController";
import { verifyOtp } from "../controllers/otpController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp); // 👈 new

export default router;
