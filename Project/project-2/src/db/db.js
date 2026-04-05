import mongoose from "mongoose";

async function connectDb(){
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("database connected")
    
  } catch (error) {
    console.log('db connection error',error)
  }
}
export default connectDb