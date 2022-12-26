import express from "express";
import { imagePost,getPosts, likePost } from "../Controllers/PostController.js";
import verifyToken from "../Middleware/authMiddleware.js";


const router = express.Router()
router.post('/imagePost', verifyToken, imagePost)
router.get('/getPosts', verifyToken, getPosts)
router.put('/likes',verifyToken,likePost)
// router.post('')
export default router;  