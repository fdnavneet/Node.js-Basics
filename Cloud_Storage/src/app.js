import express from "express"
import multer from "multer"
import uploadFile from "../service/storage.service.js"
import postModel from "../models/post.models.js"

const app = express()
app.use(express.json()) /* "This middleware does not work with form-data when uploading files, so we need to use the Multer middleware." */

const upload=multer({storage:multer.memoryStorage()})

app.post("/create-post" ,upload.single("image"),async (req,res) => {
  const result = await uploadFile(req.file.buffer)
  const post=await postModel.create({
    image :result.url,
    Caption:req.body.Caption
  })
  return res.status(201).json({
    message:"post created successfully",
    post
  })
  
})

app.get("/getAll-post",async (req,res)=>{
  const data=await postModel.find()
  res.status(200).json({
    message:"post featched successfully",
    data:data
  })
})

export default app;