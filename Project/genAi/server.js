import "dotenv/config"
import app from "./src/app.js";
import connectDb from "./src/connectio/db.js";

connectDb()

app.listen(3000,() => {
  console.log("app is runing on port number 3000")
})