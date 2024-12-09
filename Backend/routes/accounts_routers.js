const express = require("express");
const { accountmodel } = require("../Database/Db");
const { UserMiddleware } = require("../middleware/usermiddleware");
const { default: mongoose } = require("mongoose");
const AccountRouter = express.Router();

AccountRouter.get("/balance", UserMiddleware, async (req, res) => {
  const Balance = await accountmodel.findOne({
    userId: req.userId,
  });

  res.json({
    balance: Balance.balance,
  });
});

AccountRouter.post("/transfer", UserMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const to = req.body.to;
  const amount = req.body.amount;

  const person = await accountmodel
    .findOne({
      userId: req.userId,
    })
    .session(session);

  if (!person || person.balance < amount) {
    await session.abortTransaction();
    res.json({
      message: "Insufficient Funds",
    });
  }

  const toperson = await accountmodel
    .findOne({
      userId: to,
    })
    .session(session);

  if (!toperson) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await accountmodel
    .updateOne(
      {
        userId: req.userId,
      },
      {
        $inc: {
          balance: -amount,
        },
      }
    )
    .session(session);

  await accountmodel
    .updateOne(
      {
        userId: to,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    )
    .session(session);

  await session.commitTransaction();

  res.json({
    message: "Transfer successful",
  });
});

module.exports = AccountRouter;
