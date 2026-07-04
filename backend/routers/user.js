const express = require("express");
const z = require("zod");
const { User } = require("../db");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
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
    return res.status(411).json({
      msg: "email already taken / incorrect inputs",
    });
  }

  const checkUser = await User.findOne({
    username: req.body.username,
  });

  if (checkUser) {
    return res.status(411).json({
      msg: "email already taken / incorrect inputs",
    });
  }

  const createUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    username: req.body.username,
  });

  const userID = createUser._id;

  const token = jwt.sign(
    {
      userID,
    },
    process.env.JWT_SECRET,
  );

  res.json({
    msg: "user created successfully",
    token: token,
  });
});

userRouter.post("/signin", async (req, res)=>{
  const {username, password} = req.body

  const checkExistingUser = await User.findOne({
    username,
    password
  })

  if(!checkExistingUser){
    return res.status(411).json({
      msg: "error while logging in"
    })
  }

  const getExistingUserId = checkExistingUser._id

  const token = jwt.sign({
    getExistingUserId
  }, process.env.JWT_SECRET)

  res.json({
    msg: "login successful",
    token: token
  })
})

module.exports = {
  userRouter,
};
