import jwt from "jsonwebtoken"
import blacklistTokenModel from "../models/blacklist.model.js"

async function authUser(req,res,next){
  const token = req.cookies.token
  
  if(!token){
    return res.status(401).json({
      message:"Token not provided"
    })
  }

  const isTokenBlacklisted=await blacklistTokenModel.findOne({
    token
  })

  if(isTokenBlacklisted){
    return res.status(401).json({
      message:"token is invalid"
    })
  }
  try {
    const decodeed=jwt.verify(token,process.env.JWT_SECRET)
    req.user=decodeed
    next()
  } catch (error) {
    return res.status(401).json({
      message:"Invalid Token"
    })
  }
}
export default authUser