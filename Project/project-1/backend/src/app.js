import express from "express"
import authRoutes from "./routes/auth.routes.js"
import postRoute from './routes/post.routes.js'
import cookieparser from 'cookie-parser'
import  cors  from "cors";



const app=express()
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json())
app.use(cookieparser())

app.use("/api/auth",authRoutes)
app.use("/api/post",postRoute)


export default app;