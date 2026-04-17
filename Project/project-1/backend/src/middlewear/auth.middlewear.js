
import jwt from "jsonwebtoken"



function authUser(req,res,next){
  console.log("middleware hit 🔥");
  console.log("cookies:", req.cookies);

  const token = req.cookies.token;

  if(!token){
    console.log("NO TOKEN ❌");
    return res.status(401).json({
      message:"unauth"
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;
    next();

  } catch (error) {
    console.log("TOKEN INVALID ❌");
    return res.status(401).json({
      message:"unauth"
    });
  }
}
export default authUser