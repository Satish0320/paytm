const express = require("express");
const { accountmodel } = require("../Database/Db");
const { UserMiddleware } = require("../middleware/usermiddleware");
const { default: mongoose } = require("mongoose");
const AccountRouter = express.Router();

AccountRouter.get("/balance", UserMiddleware, async (req, res) => {
  const user = await accountmodel.findOne({
    userId: req.userId,
  });

  res.json({
    balance: user.balance,
  });
});

AccountRouter.post("/transfer", UserMiddleware, async (req, res) => {
    const {amount, receiverId} = req.body;
    const Sender = await accountmodel.findOne({userId: req.userId})
    const Receiver = await accountmodel.findOne({userId: receiverId})
    Sender.balance = Sender.balance - parseInt(amount);
    Receiver.balance = Receiver.balance + parseInt(amount);


  res.json({
    message: Sender,
  });
});

module.exports = AccountRouter;
