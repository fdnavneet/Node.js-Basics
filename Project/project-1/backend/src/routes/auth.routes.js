import express from "express"
import { signUp,logIn } from "../controllers/auth.controllers.js"

signUp

const router= express.Router()

router.post("/creat-account",signUp)
router.post("/login",logIn)
export default router