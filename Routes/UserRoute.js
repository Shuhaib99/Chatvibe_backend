import express from "express";
import { getUser,followUser,unFollowUser } from "../Controllers/UserController.js";
import verifyToken from "../Middleware/authMiddleware.js";


const router = express.Router()


router.get('/:id',verifyToken, getUser)
router.post('/follow',verifyToken, followUser)
router.post('/unfollow',verifyToken, unFollowUser)
// router.post('')
export default router;  