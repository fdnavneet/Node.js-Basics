import express from 'express'
import authRoutes from "../routes/auth.routes.js"
import postRoute from '../routes/post.routes.js'
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",authRoutes)
app.use("/api/post",postRoute) /* dummpy api for tokem verification */

export default app;