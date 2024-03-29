import express from "express";
import { getUser,followUser,unFollowUser, updateUserProfile, getCurrentUserByID,getFollowers, getFollowingUser, getSavedPosts, getUsers, clearNotification, getNotification } from "../Controllers/UserController.js";
import verifyToken from "../Middleware/authMiddleware.js";


const router = express.Router()


router.get('/userById/:id',verifyToken, getUser)
router.get('/getCurrentUser',verifyToken, getCurrentUserByID)
router.get('/getFollowers/:id',verifyToken, getFollowers)
router.get('/getFollowingUser/:id',verifyToken, getFollowingUser)
router.get('/getSavedPosts',verifyToken, getSavedPosts)
router.get('/getUsers/:data',verifyToken, getUsers)
router.get('/getNotification',verifyToken, getNotification)


router.post('/follow',verifyToken, followUser)
router.post('/unfollow',verifyToken, unFollowUser)
router.post('/updateProfileImg',verifyToken, updateUserProfile)
router.delete('/deleteNotification',verifyToken,clearNotification)


// router.post('')
export default router;  