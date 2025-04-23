const BlacklistTokenModel = require("../models/blacklistToken.model");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

async function registerUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ error: "User already exists" });
      }
  

  const hashedPassword = await userModel.hashPassword(password);
  // console.log(hashedPassword);

  const user = await userService.createUser({
    fullname,
    email,
    password: hashedPassword,
  });
  // console.log(user);

  const token = user.generateAuthToken();

  res.status(201).json({
    message: "User registered successfully",
    token,
    user,
  });
}

async function loginUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ error: "Incorrect email or password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ error: "Incorrect email or password" });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    token,
    user,
  });
}

async function getUserProfile(req, res) {
  res.status(200).json(req.user);
}


async function logoutUser(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await BlacklistTokenModel.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
}



module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
};
