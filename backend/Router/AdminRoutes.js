import express from "express"
import { adminMiddleware, authMiddleware } from "../Middleware/auth.js"
import { getmycourts}  from "../Controller/AdminCourt.js"

const router=express.Router()


router.get("/mycourts",authMiddleware,adminMiddleware,getmycourts)

export default router