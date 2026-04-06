import express from "express"
import { signUp,logIn,logOut,protectedRoutes } from "../controllers/auth.controllers.js"

signUp

const router= express.Router()

router.post("/creat-account",signUp)
router.post("/login",logIn)
router.post("/logOut",logOut)
router.get("/protectedRoutes",protectedRoutes)
export default router