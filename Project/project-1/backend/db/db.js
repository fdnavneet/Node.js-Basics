import mongoose from "mongoose";

async function connectDb(){
  await mongoose.connect("mongodb+srv://ytbackend:isBiRsqryEBYLzBR@backend.y3i9n9r.mongodb.net/image-gallery")
  console.log("db is connected ")
}

export default connectDb