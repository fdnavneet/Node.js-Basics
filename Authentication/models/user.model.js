import mongoose from "mongoose";

const userShema=new mongoose.Schema({
  username:String,
  email:{
    type:String,
    unique:true
  },
  password : String
},{timestamps:true})

const userModel = mongoose.model('user',userShema)
export default userModel