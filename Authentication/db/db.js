import mongoose from "mongoose";

async function connectdb(){
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("mongoose is connected")
  } catch (error) {
    console.log(`Db connection error`,error)
  }
}
export default connectdb