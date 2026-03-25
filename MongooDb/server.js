import app from './src/app.js'
import connectDb from './db/db.js'

connectDb()

app.listen(3000,() => {
  console.log("app is running on 3000 port")
})