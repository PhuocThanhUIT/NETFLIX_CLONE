const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
dotenv.config();
main();

async function main() {
  try {
    await mongoose.connect(
      process.env.MONGO_URL
    );
    console.log("connect success")
  } catch (error) {
    console.log("Connect db err");
  }
}
app.use(express.json());

app.listen(8800, () => {
  console.log("Sever running");
});
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);