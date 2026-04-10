import express from "express"
import { signUp,logIn,logOut,protectedRoutes } from "../controllers/auth.controllers.js"
import authUser from "../middlewear/auth.middlewear.js"



const router= express.Router()

router.post("/creat-account",signUp)
router.post("/login",logIn)
router.post("/logOut",logOut)
router.get("/protectedRoutes",authUser,protectedRoutes)
export default router