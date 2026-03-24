import express from 'express'

const app= express()

app.get('/' ,(req,res) => {
  res.send( "i am from backend"
  )
})

app.get('/about' ,(req,res) => {
  res.send("about page ")
})

app.listen(3000,() =>{
  console.log("server is runing on port number 3000")
})