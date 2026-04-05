import userModel from "../models/user.models.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

async function registerUser(req,res){
  const{userName,email,password,role="user"} = req.body

  const userExixts= await userModel.findOne({
    $or:[
      {userName},
      {email}
    ]
  })
  if(userExixts){
    return res.status(409).json({
      mes:"user already registered with this userName and email"
    })
  }

  const hashedPassword=await bcrypt.hash(password,10)

  const user= await userModel.create({
    userName,
    password:hashedPassword,
    email,
    role
  })

  const token =jwt.sign({
    id:user._id,
    role:user.role
  },process.env.JWT_SECRET)

  res.cookie('token',token)
  res.status(201).json({
    msg:"user created",
    user:{
      id:user._id,
      userName:user.userName,
      email:user.email,
      role:user.role
    }
  })
}

async function login(req,res){
  const{userName,email,password} = req.body
  const user = await userModel.findOne({
    $or:[
      {userName},
      {email}
    ]
  })
  if(!user){
    return res.status(401).json({
      message:"invalid userName "
    })
  }

  const isValidPassword=await bcrypt.compare(password,user.password)
  if(!isValidPassword){
    return res.status(401).json({
      message: "Invalid Password"
    })
  }

  const token = jwt.sign({
    id:user._id,
    role:user.role,
  },process.env.JWT_SECRET)

  res.cookie("token",token)
  res.status(200).json({
    message:"user logedIn sucessfully",
    user:{
      id:user._id,
      user:user.userName,
      email:user.email,
      role:user.role
    }
    
  })
}
export {registerUser,login}