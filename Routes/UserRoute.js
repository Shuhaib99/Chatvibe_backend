import express from "express";
import { getUser } from "../Controllers/UserController.js";
import verifyToken from "../Middleware/authMiddleware.js";


const router = express.Router()


router.get('/:id',verifyToken, getUser)
// router.post('')
export default router;  