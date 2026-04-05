import express from "express"
import multer from 'multer'
import { creatPostModel,getAllPost,deletePost } from "../controllers/post.controllers.js"




const router = express.Router()


const upload =multer({storage:multer.memoryStorage()})

router.post("/create-post",upload.single("image"),creatPostModel)
router.get('/getAll-post',getAllPost)
router.delete("/delete-post/:id",deletePost)



export default router