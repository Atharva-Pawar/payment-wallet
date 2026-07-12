const express = require("express");
const z = require("zod");
const { User, Account } = require("../db");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middlewares/middleware");
require("dotenv").config();

const userSchemaValidation = z.object({
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(6),
  username: z.string().email(),
});

userRouter.post("/signup", async (req, res) => {
  const { success } = userSchemaValidation.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      msg: "Incorrect inputs",
    });
  }

  const checkUser = await User.findOne({
    username: req.body.username,
  });

  if (checkUser) {
    return res.status(409).json({
      msg: "Email already taken",
    });
  }

  const createUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    username: req.body.username,
  });

  const userID = createUser._id;

  await Account.create({
    userID,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userID,
    },
    process.env.JWT_SECRET,
  );

  return res.status(201).json({
    msg: "User created successfully",
    token,
  });
});

userRouter.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const checkExistingUser = await User.findOne({
    username,
    password,
  });

  if (!checkExistingUser) {
    return res.status(401).json({
      msg: "Invalid username or password",
    });
  }

  const userID = checkExistingUser._id;

  const token = jwt.sign(
    {
      userID,
    },
    process.env.JWT_SECRET,
  );

  return res.status(200).json({
    msg: "Login successful",
    token,
  });
});

const updateBody = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().min(6).optional(),
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      msg: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userID }, req.body);

  return res.status(200).json({
    msg: "Updated successfully",
  });
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  return res.status(200).json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = {
  userRouter,
};
