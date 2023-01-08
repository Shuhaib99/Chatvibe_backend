import express  from "express";
import { addMessage, getMessages } from "../Controllers/MessageController.js";
import verifyToken from "../Middleware/authMiddleware.js";

const router = express.Router()

router.post('/addMessage', verifyToken, addMessage)
router.get('/get_messages/:chatId', verifyToken, getMessages)

export default router 