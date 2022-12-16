import express from "express";
import jwt from 'jsonwebtoken'
import { getUser } from "../Controllers/UserController.js";
import dotenv from 'dotenv'
import verifyToken from "../Middleware/authMiddleware.js";


const router = express.Router()


router.get('/:id',verifyToken, getUser)
export default router; 