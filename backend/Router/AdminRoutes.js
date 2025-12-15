import express from "express"
import { adminMiddleware, authMiddleware } from "../Middleware/auth.js"
import { getCourtById, getmycourts, updateCourt}  from "../Controller/AdminCourt.js"

const router=express.Router()


router.get("/mycourts",authMiddleware,adminMiddleware,getmycourts)
router.get("/court/:id",authMiddleware,adminMiddleware,getCourtById)
router.put("/updatecourt/:id",authMiddleware,adminMiddleware,updateCourt)

export default router