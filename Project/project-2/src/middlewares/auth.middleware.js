import jwt  from "jsonwebtoken";

async function authArtist(req,res,next){
  const token = req.cookies.token
  if(!token){
    return res.status(401).json({
      message:"unauth"
    })
  }

  try {
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    if(decode.role !== "artist"){
      return res.status(403).json({
        message:"you dont have access"
      })
    }
    req.user=decode
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      message:"unauthrize"
    })
  }
}


async function authUser(req,res,next){
  const token=req.cookies.token
  if(!token){
    return res.status(401).json({
      message:"unauth"
    })
  }

  try {
    const decode= jwt.verify(token,process.env.JWT_SECRET)

    if(decode.role !== "user"){
      return res.status(403).json({
        message:'you have donit access'
      })
    }
    req.user=decode
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      message:"unauth"
    })
  }
}

export  {authArtist ,authUser}