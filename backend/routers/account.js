const express = require("express");
const { Account } = require("../db");
const app = express();
const { authMiddleware } = require("../middlewares/middleware");
const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  if (!account) {
    return res.status(404).json({
      msg: "Account not found",
    });
  }

  return res.status(200).json({
    balance: account.balance,
  });
});

accountRouter.post("/transfer", authMiddleware, async (req, res, next) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const { ammount, to } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (!account || account.balance < ammount) {
    return res.status(400).json({
      msg: "Insufficient Balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    return res.status(404).json({
      msg: "Invalid Account",
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -ammount,
      },
    },
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: ammount,
      },
    },
  ).session(session);

  await session.commitTransaction();

  return res.status(200).json({
    msg: "Transfer Successful",
  });
});

module.exports = {
  accountRouter,
};
