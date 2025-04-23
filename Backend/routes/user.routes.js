const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authmiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name should be at least 3 characters long"),
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long"),
  ],
  userController.registerUser
);

router.post("/login",[
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long"),
  ],userController.loginUser);

  router.get('/profile',authmiddleware.authUser,userController.getUserProfile)

  router.get('/logout',authmiddleware.authUser,userController.logoutUser)

module.exports = router;
