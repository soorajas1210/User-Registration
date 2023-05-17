const asyncHandler = require("express-async-handler");
const generateTocken = require("../utils/generateTocken");
const User = require("../models/userModel");

const userRegister = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(firstName, lastName, email, password);
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("User Already Exists");
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    console.log(user);

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateTocken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Error Occured!");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const userSignin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateTocken(user._id),
      });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});


module.exports = {
  userRegister,
  userSignin,
};
