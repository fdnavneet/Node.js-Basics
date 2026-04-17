import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import blacklistTokenModel from "../models/blacklist.model.js";

async function registerUser(req, res) {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({
      message: "Please Provide Usename,Email And Password",
    });
  }
  const userExist = await userModel.findOne({
    $or: [{ userName }, { email }],
  });
  if (userExist) {
    return res.status(409).json({
      message: "User Already Register with This Email or Username",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    userName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
      userName: user.userName,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "Account Created Succesfully",
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
    },
  });
}

async function logIn(req, res) {
  const { userName, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ userName }, { email }],
  });

  if (!user) {
    return res.status(401).json({
      message: "invalid username or password",
    });
  }

  const compairPassword = await bcrypt.compare(password, user.password);
  if (!compairPassword) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      userName: user.userName,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token",token)
  res.status(200).json({
    message:"login sucessfull",
    user:{
      id:user._id,
      userName:user.userName,
      email:user.email
    }
  })
}

async function logOut(req,res){
  const token=req.cookies.token
  if(token){
    await blacklistTokenModel.create({token})
  }
  res.clearCookie("token")
  res.status(200).json({
    message:"User Logged out Successfully"
  })
}

async function getMe(req,res){
  const user=await userModel.findById(req.user.id)
  res.status(200).json({
    message:"user details feactched successfull",
    user:{
      id:user.id,
      userName:user.userName,
      email:user.email
    }
  })
}
export { registerUser,logIn,logOut,getMe };
