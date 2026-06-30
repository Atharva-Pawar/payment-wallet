const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  username: String,
});

const accountSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
