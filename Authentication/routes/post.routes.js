
// dummy api for token verify
import express from "express"
import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"

const router=express.Router()

router.post('/creat',async (req,res) =>{
 const token = req.cookies.token

 if(!token){
  return res.status(401).json({
    mes:"unauthrize"
  })
 }
  

 try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const user = await userModel.findOne({
      _id:decoded.id
    })
    console.log(user)

 } catch (error) {
  return res.status(401).json({
    msg:"token invalid"
  })
 }
 
  
  res.send("post createsd ")
})
export default router