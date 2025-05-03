const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { pickup, destination, vehicleType,otp } = req.body;
    // console.log("pppppp", pickup, destination, vehicleType);
    // console.log("User ID:", req.user._id); // Log the user ID

    // Validate input
    if (!pickup || !destination || !vehicleType) {
      return res.status(400).json({
        message: "User ID, pickup, destination, and vehicle type are required",
      });
    }

    // Create ride
    const ride = await rideService.createRide({
      user: "680a3fc807357c4620dda61d",
      pickup: pickup,
      destination: destination,
      vehicleType: vehicleType,
      otp:otp
    });

    return res.status(201).json({ message: "Ride created successfully", ride });
  } catch (error) {
    // console.error("Error creating ride:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { pickup, destination } = req.query;
    // console.log("pppppp", pickup, destination, vehicleType);

    // Validate input
    if (!pickup || !destination ) {
      return res.status(400).json({
        message: "Pickup, destination, and vehicle type are required",
      });
    }

    // Get fare
    const fare = await rideService.getFare(pickup, destination);

    return res.status(200).json({ message: "Fare fetched successfully", fare });
  } catch (error) {
    // console.error("Error fetching fare:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
