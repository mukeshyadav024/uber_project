const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
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
    body('vehicle.vehicleType')
      .isLength({ min: 3 })
      .withMessage("Vehicle type should be at least 3 characters long"),
    body('vehicle.color')
      .isLength({ min: 3 })
      .withMessage("Vehicle color should be at least 3 characters long"),
    body('vehicle.plate')
      .isLength({ min: 3 })
      .withMessage("Vehicle plate should be at least 3 characters long"),
    body('vehicle.capacity')
      .isNumeric()
      .withMessage("Vehicle capacity should be a number"),

  ],
  captainController.registerCaptain
);

router.post("/login",[
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long"),
  ],captainController.loginCaptain);

router.get('/profile',authmiddleware.authCaptain,captainController.getCaptainProfile)
router.get('/logout',authmiddleware.authCaptain,captainController.logoutCaptain)

module.exports = router;
