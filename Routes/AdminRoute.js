import express from "express";
import { blockUser, deleteReport, getAllUsers, getReport } from "../Controllers/AdminController.js";
import { loginAdmin } from "../Controllers/AuthController.js";
import verifyToken from "../Middleware/authMiddleware.js";


const router =express.Router()

router.post('/bySuper',loginAdmin)
router.get('/getReport',verifyToken, getReport)
router.delete('/deleteReport',verifyToken,deleteReport)
router.get('/getAllUsers',verifyToken,getAllUsers)
router.post('/blockUser',verifyToken, blockUser)

export default router;