import express from "express"
import { registerUser,logIn,logOut,getMe } from "../controller/auth.controller.js"
import authUser from "../middleware/auth.middleware.js"


const router=express.Router()

router.post("/register-user",registerUser)
router.post("/login",logIn)
router.get("/logout",logOut)
router.get("/get-me",authUser,getMe)

export default router