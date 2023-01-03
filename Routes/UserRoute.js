import express from "express";
import { getUser,followUser,unFollowUser, updateUserProfile, getCurrentUserByID,getFollowers, getFollowingUser } from "../Controllers/UserController.js";
import verifyToken from "../Middleware/authMiddleware.js";


const router = express.Router()


router.get('/userById:id',verifyToken, getUser)
router.get('/getCurrentUser',verifyToken, getCurrentUserByID)
router.post('/follow',verifyToken, followUser)
router.post('/unfollow',verifyToken, unFollowUser)
router.get('/getFollowers/:id',verifyToken, getFollowers)
router.get('/getFollowingUser/:id',verifyToken, getFollowingUser)
router.post('/updateProfileImg',verifyToken, updateUserProfile)

// router.post('')
export default router;  