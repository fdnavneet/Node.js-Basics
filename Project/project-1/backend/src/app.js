import express from "express"
import postModel from "../models/post.models.js";
import multer from "multer";
import uploadFile from "../service/storage.service.js";
import  cors  from "cors";


const app=express()
app.use(cors())
app.use(express.json())

const upload =multer({storage:multer.memoryStorage()})

app.post("/create-post",upload.single("image"),async (req,res) =>{
  const result = await uploadFile(req.file.buffer)
  const post=await postModel.create({
    title:req.body.title,
    image:result.url,
    description:req.body.description
  })
  return res.status(200).json({
    message:"post created sucessfully",
    post
  })
})


app.get("/getAll-post",async (req,res) =>{
  const post =await postModel.find()
  res.status(201).json({
    message:"post featched",
    post
  })
  
})

app.delete("/Delete-post/:id",async (req,res) =>{
  const id=req.params.id
  await postModel.findByIdAndDelete({
    _id:id
  })
  res.status(200).json({
    message:"post is deleted"
  })
})




export default app;