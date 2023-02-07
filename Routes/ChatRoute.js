import express  from "express";
import { createChat, findChat, userChats } from "../Controllers/ChatController.js";
import verifyToken from "../Middleware/authMiddleware.js";

const router = express.Router()

router.post('/createChat',verifyToken, createChat)
router.get('/userChats', verifyToken, userChats)
router.get('/findchat/:secondId', verifyToken, findChat)

export default router