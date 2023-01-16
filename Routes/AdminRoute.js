import express from "express";
import { loginAdmin } from "../Controllers/AuthController.js";
import { getReport } from "../Controllers/ReportController.js";
import verifyToken from "../Middleware/authMiddleware.js";


const router =express.Router()

router.post('/bySuper',loginAdmin)
router.get('/getReport', getReport)

export default router;