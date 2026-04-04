import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"

async function register(req,res){
  const{username,email,password} = req.body

 const userExixts=await userModel.findOne({
  email
 })
 if(userExixts){
  return res.status(409).json({
    message:"user allready exixts"
  })
 }

  const user = await userModel.create({
    username,password,email
  })
  const token = jwt.sign({
    id:user._id
  },process.env.JWT_SECRET)

  res.cookie("token",token)
  
  res.status(201).json({
    msg:"user created",
    user,
  })
}

export {register};