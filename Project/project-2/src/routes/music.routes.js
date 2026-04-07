import express from "express"
import { createMusic,creatAlbum ,getAllMusic,getAllAlbum,getAlbumById} from "../controllers/music.controllet.js"
import multer from "multer"
import {authArtist,authUser} from "../middlewares/auth.middleware.js"


const upload=multer({
  storage:multer.memoryStorage()
})

const router=express.Router()

router.post('/creatmusic', authArtist,upload.single("music") ,createMusic)
router.post('/creatalbum',authArtist,creatAlbum)
router.get("/",authUser,getAllMusic)
router.get("/album",authUser,getAllAlbum)
router.get("/album/:albumId",authUser,getAlbumById)

export default router