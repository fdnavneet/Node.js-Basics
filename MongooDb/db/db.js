import mongoose from "mongoose";

async function connectDb(){
  await mongoose.connect("mongodb+srv://ytbackend:isBiRsqryEBYLzBR@backend.y3i9n9r.mongodb.net/studyPeriod")
  console.log("conntected to DB")
}

export default connectDb