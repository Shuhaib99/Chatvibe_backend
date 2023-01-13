import express from "express";
import { loginAdmin } from "../Controllers/AuthController.js";


const router =express.Router()

router.post('/bySuper',loginAdmin)

export default router;