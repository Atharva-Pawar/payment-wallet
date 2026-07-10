const express = require("express");
const { Account } = require("../db");
const app = express();
const accountRouter = express.Router();

accountRouter.get("/balance", async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

module.exports = {
  accountRouter,
};
