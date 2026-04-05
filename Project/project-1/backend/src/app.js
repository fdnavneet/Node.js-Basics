import express from "express"
import postRoute from './routes/post.routes.js'
import  cors  from "cors";



const app=express()
app.use(cors())
app.use(express.json())

// app.use("/api/auth",authRoutes)
app.use("/api/post",postRoute)


export default app;