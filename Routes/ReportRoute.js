import express from "express" 
import { addReport } from "../Controllers/ReportController.js";
import verifyToken from "../Middleware/authMiddleware.js";

const router = express()

router.post('/addReport',verifyToken, addReport)

export default router;