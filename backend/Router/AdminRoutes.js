import express from "express"
import { adminMiddleware, authMiddleware } from "../Middleware/auth.js"
import { getCourtById, getmycourts}  from "../Controller/AdminCourt.js"

const router=express.Router()


router.get("/mycourts",authMiddleware,adminMiddleware,getmycourts)
router.get("/court/:Id",authMiddleware,adminMiddleware,getCourtById)

export default router