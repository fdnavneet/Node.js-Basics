import express from "express";

const app = express();
app.use(express.json());

const notes = [];

//creat api
app.post("/creat", (req, res) => {
  notes.push(req.body);
  res.status(201).json({ message: "notes created successfully" });
});


// get alldetails
app.get("/getNotes", (req, res) => {
  res.status(200).json({
    notes: notes,
    message: "Notes fetched successfully",
  });
});

// delete api
app.delete("/delete/:index", (req,res) => {
  const index =req.params.index
  delete notes[index]
  res.status(200).json({
    message:'notes deleted sucessfully'
  })
})

// for update
app.put("/update/:index" ,(req,res) => {
  const index=req.params.index
  const description = req.body.description
  const title=req.body.title
  notes[index].description=description
  notes[index].title=title
  res.status(200).json({
    message :"notes updated successfully"
  })
})

export default app;
