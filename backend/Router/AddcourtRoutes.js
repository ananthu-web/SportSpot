import express, { Router } from "express"
import { AddCourt } from "../Controller/Addcourt.js"

const router=express.Router()

router.post("/addcourts",AddCourt)

export default router
