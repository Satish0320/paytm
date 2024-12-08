const express = require("express");
const jwt = require("jsonwebtoken");
const z = require("zod");
const bcrypt = require("bcrypt");
require("dotenv").config();

const UserRouter = express.Router();
const { usermodel, accountmodel } = require("../Datbase/Db");
const { UserMiddleware } = require("../middleware/usermiddleware");

UserRouter.post("/signup", async (req, res) => {
  const requirebody = z.object({
    email: z.string().email(),
    password: z.string(),
    username: z.string(),
    name: z.string(),
  });

  const validatebody = requirebody.safeParse(req.body);

  if (!validatebody.success) {
    res.json({
      message: "Invalid Inputs",
      error: validatebody.error,
    });
    return;
  }

  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const name = req.body.name;

  const hashpassword = await bcrypt.hash(password, 5);

  const newUser = await usermodel.create({
    email: email,
    password: hashpassword,
    username: username,
    name: name,
  });

  const randomBalance = 1 + Math.random() * 10000;
  await accountmodel.create({
    userId: newUser._id,
    balance: randomBalance,
  });

  res.json({
    message: "User created ",
    userId: newUser._id,
    balance: randomBalance,
  });
});

UserRouter.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const findinduser = await usermodel.findOne({
    email: email,
  });

  if (!findinduser) {
    res.json({
      message: "Invalid email",
    });
  }

  const validatepassword = bcrypt.compare(password, findinduser.password);

  if (validatepassword) {
    const token = jwt.sign(
      {
        id: findinduser._id.toString(),
      },
      process.env.JWT_SECRET
    );

    // console.log(token);

    res.json({
      Token: token,
    });
  } else {
    res.status(400).json({
      message: "Invalid Inputs",
    });
  }
});

UserRouter.put("/update", UserMiddleware, async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const name = req.body.name;
  const userId = req.userId;

  const updateuser = await usermodel.updateOne(
    {
      _id: userId,
    },
    {
      email: email,
      password: password,
      username: username,
      name: name,
    }
  );

  res.json({
    message: "updated sucessfully",
    UserId: updateuser._id,
  });
});

UserRouter.get("/Finduser", UserMiddleware, async (req, res) => {
  const username = req.query.username;

  let users;

  if (username) {
    users = await usermodel.find({
      username: new RegExp(username, "i"),
    });
  } else {
    users = await usermodel.find();
  }

  //    const user_name = users[0].username;
  //    console.log(user_name);

  // console.log(users);
  const user_id = users.map((x) => x._id);
  // console.log(user_id);

  const fullData = await accountmodel.find({
    userId: { $in: user_id },
  });
  const balance = fullData[0].balance;

  res.json({
    users,
    // user_name,
    balance,
  });
});

UserRouter.get("/allUsers", UserMiddleware, async(req, res)=>{

  const allusers = await usermodel.find()
  res.json({
    allusers
  });
})

module.exports = {
  UserRouter,
};
