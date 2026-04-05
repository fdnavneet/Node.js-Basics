import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title:String,
  image:String,
  description:String,


},{timestamps:true}) 

const postModel = mongoose.model("post" , postSchema)
export default postModel