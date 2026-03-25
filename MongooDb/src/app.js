import express from "express"
import noteModel from "../models/note.models.js"

const app = express()
app.use(express.json())


// creat notes
app.post('/creat',async (req,res) => {
  const data= await req.body
  noteModel.create({
    title :data.title,
    description:data.description
  })
  res.status(200).json({
    message:"notes created successfully"
  })
})

// get all notes
app.get("/getallnotes" , async(req,res) =>{
  const notes = await noteModel.find()

  res.status(200).json({
    message : "notes featched",
    notes :notes
  })
})

// delete notes
app.delete("/delet/:id", async (req,res) =>{
  const id=req.params.id
  await noteModel.findByIdAndDelete({
    _id:id
  })
  res.status(200).json({
    message:"notes deleted"
  })
})

// update notes
app.patch('/update/:id',async(req,res) =>{
  const id=req.params.id
  const title=req.body.title
  const description = req.body.description
  await noteModel.findOneAndUpdate({
    _id:id
  },{
    description:description,
    title:title
  })
  res.status(200).json({
    message :"notes updated "
  })
})

export default app