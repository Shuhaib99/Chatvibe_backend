import express  from "express";
import { addMessage, getMessages } from "../Controllers/MessageController.js";
import verifyToken from "../Middleware/authMiddleware.js";

const router = express.Router()

router.post('/', verifyToken, addMessage)
router.get('/:chatId', verifyToken, getMessages)

export default router 