import express, { Router } from "express"
import { AddCourt } from "../Controller/Addcourt.js"
import { adminMiddleware, authMiddleware } from "../Middleware/auth.js"

const router=express.Router()

router.put("/addcourts",authMiddleware,adminMiddleware, AddCourt)

export default router
