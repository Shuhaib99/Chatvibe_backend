import express  from "express";
import { createChat, findChat, userChats } from "../Controllers/ChatController.js";
import verifyToken from "../Middleware/authMiddleware.js";

const router = express.Router()

router.post('/',verifyToken, createChat)
router.get('/userChats', verifyToken, userChats)
router.get('/find/:firstid/:secondid', verifyToken, findChat)

export default router 