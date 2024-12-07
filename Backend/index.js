require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const { UserRouter } = require("./routes/user_routes");
const AccountRouter = require("./routes/accounts_routers");

app.use("/user", UserRouter);
app.use("/account", AccountRouter);

// console.log("Mongo URI:", process.env.MONGO_URI);
async function connect() {
  // console.log("Mongo URI:", process.env.MONGO_URI);
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(4000);
  console.log("Connected successfully!!!");
}
connect();
