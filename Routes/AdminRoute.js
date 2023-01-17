import express from "express";
import { loginAdmin } from "../Controllers/AuthController.js";
import { deleteReport, getReport } from "../Controllers/ReportController.js";
import verifyToken from "../Middleware/authMiddleware.js";


const router =express.Router()

router.post('/bySuper',loginAdmin)
router.get('/getReport',verifyToken, getReport)
router.delete('/deleteReport',verifyToken,deleteReport)

export default router;