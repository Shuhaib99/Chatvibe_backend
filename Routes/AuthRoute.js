import express from "express";
import {googleuser, loginUser, OtpVerification, registerUser } from "../Controllers/AuthController.js";

const router =express.Router()

router.post('/otpVerify',OtpVerification)
router.post('/register', registerUser)
router.post('/login',loginUser)
router.post('/google',googleuser)

export default router;