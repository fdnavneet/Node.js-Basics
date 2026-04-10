import userModel from "../models/user.models.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

async function signUp(req,res){
  const{userName,email,password} =req.body

  const isUserExist=await userModel.findOne({
    $or:[
      {userName},
      {email}
    ]
  })

  if(isUserExist){
    return res.status(409).json({
      message:"user allready register with this email and userName"
    })
  }

  const hashedPassword =await bcrypt.hash(password,10)

  const user= await userModel.create({
    userName,
    password:hashedPassword,
    email

  })

  const token=jwt.sign({
    id:user._id
  },process.env.JWT_SECRET)

  res.cookie("token",token,{
    httpOnly:true,
    sameSite:"lax",
    secure:false,
  })
  res.status(201).json({
    message:"Account created successfully",
    user:{
      id:user._id,
      user:user.userName,
      email:user.email
    }
  })

}

async function logIn(req,res){
  const{userName,password,email} = req.body

  const user = await userModel.findOne({
    $or:[
      {userName},
      {email}
    ]
  })

  if(!user){
    return res.status(401).json({
      message:"invalid userName and email"
    })
  }

 const isValidpassowrd= await bcrypt.compare(password,user.password)
 if(!isValidpassowrd){
  return res.status(401).json({
    message:"invalid password"
  })
 }
 
 const token = jwt.sign({
  id:user._id
 },process.env.JWT_SECRET)
 res.cookie("token",token,{
  httpOnly:true,
  sameSite:"lax",
  secure:false
 })

 res.status(200).json({
  message:"user log in sucessfully",
  user:{
    id:user._id,
    user:user.userName,
    email:user.email,

  }
 })

}

function logOut(req,res){
  res.clearCookie("token",{
    httpOnly:true,
    sameSite:"lax",
    secure:false
  })
  res.status(200).json({
    message: "Logout successful"
  })
}

function protectedRoutes(req,res){
  
  res.json({user:req.user})
}
export {signUp,logIn,logOut,protectedRoutes}