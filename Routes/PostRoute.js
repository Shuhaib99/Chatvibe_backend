import express from "express";
import { imagePost,getPosts, likePost, commentPost, getPostsById } from "../Controllers/PostController.js";
import verifyToken from "../Middleware/authMiddleware.js";


const router = express.Router()
router.post('/imagePost', verifyToken, imagePost)
router.get('/getPosts', verifyToken, getPosts)
router.post('/likes',verifyToken,likePost)
router.post('/commentPost',verifyToken,commentPost)
router.get('/getPostsByID/:id', verifyToken, getPostsById)
// router.post('')
export default router;  