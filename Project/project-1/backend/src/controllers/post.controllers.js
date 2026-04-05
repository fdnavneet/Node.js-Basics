import postModel from "../models/post.models.js";
import uploadFile from "../service/storage.service.js";


async function creatPostModel(req,res){
  const result=await uploadFile(req.file.buffer)
  const post= await postModel.create({
    title : req.body.title,
    image:result.url,
    description:req.body.description
  })
  return res.status(200).json({
    msg:"post created ",
    post
  })
}

async function getAllPost(req,res){
  const post= await postModel.find()
  res.status(200).json({
    msg:"post featched",
    post
  })
}

async function deletePost(req,res){
  const id=req.params.id
  await postModel.findByIdAndDelete({
    _id:id
  })
  res.status(200).json({
    msg:"post delated successfully"
  })
}

export {creatPostModel,getAllPost,deletePost}