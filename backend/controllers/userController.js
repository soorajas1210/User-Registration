const asyncHandler = require("express-async-handler");
const generateTocken = require("../utils/generateTocken");
const User = require("../models/userModel");
const cloudinary = require("../utils/cloudinary");

const userRegister = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const {
      profileImage,
      firstName,
      lastName,
      email,
      mobileno,
      password,
      country,
      streetAddress,
      city,
      state,
      pin,
    } = req.body;

    const result = await cloudinary.uploader.upload(profileImage, {
      folder: "userProfile",
      width: 200,
      crop: "scale",
    });

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("User Already Exists");
    }
    const user = await User.create({
      profileImage: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      firstName,
      lastName,
      email,
      mobileno,
      password,
      country,
      streetAddress,
      city,
      state,
      pin,
    });
    console.log("user", user);

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

const getUserInfo = asyncHandler(async (req, res) => {
  try {
    const { myValue } = req;

    const myId = myValue.toString();
    console.log(myId);
    const userData = await User.findById(myId);

    if (userData) {
      res.status(200).json(userData);
    } else {
      console.log("error:", error);
      throw new Error("No data found!");
    }
  } catch (error) {
    console.log("error:", error);
    throw new Error("No data found!");
  }
});

const editUser = asyncHandler(async (req, res) => {
  try {
    const { myValue, body } = req;
    const myId = myValue.toString();
    const { editData } = body;

    const result = await cloudinary.uploader.upload(editData.profileImage, {
      folder: "userProfile",
      width: 200,
      crop: "scale",
    });

    if (editData) {
      const update = await User.findOneAndUpdate(
        { _id: myId },
        {
          profileImage: {
            url: result.secure_url,
            public_id: result.public_id,
          },
          firstName: editData.firstName,
          lastName: editData.lastName,
          email: editData.email,
          mobileno: editData.phoneNumber,
          streetAddress: editData.streetAddress,
          city: editData.city,
          state: editData.state,
          pin: editData.pin,
          country: editData.country,
        }
      );
      if (update) {
        res.status(200).json(update);
      } else {
        console.log("error:", error);
        throw new Error("Details not updated");
      }
    }
  } catch (error) {
    console.log("error:", error);
    throw new Error("No data found!");
  }
});

module.exports = {
  userRegister,
  userSignin,
  getUserInfo,
  editUser,
};
