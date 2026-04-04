import "dotenv/config"
import app from "./src/app.js";
import connectdb from "./db/db.js";

connectdb()

app.listen(3000,() => {
  console.log(` app is runing on port number 3000`)
})