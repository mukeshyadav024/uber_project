const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapsService = require("../services/maps.service");
const {sendMessageToSocketId} = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination, vehicleType, otp } = req.body;
  if (!pickup || !destination || !vehicleType) {
    return res.status(400).json({
      message: "User ID, pickup, destination, and vehicle type are required",
    });
  }

  try {
    // Create ride
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
      otp,
    });

    const pickupCoordinates = await mapsService.getAddressCoordinate(pickup);
    // console.log("pickupCoordinates", pickupCoordinates);
    if (
      !pickupCoordinates ||
      typeof pickupCoordinates.ltd !== "number" ||
      typeof pickupCoordinates.lng !== "number"
    ) {
      return res.status(404).json({ message: "pickup coordinates not found or invalid" });
    }
    // console.log("pickupCoordinates 2", pickupCoordinates);
    
    const captainsInRadius = await mapsService.getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2000
    );
    
    // console.log("captainsInRadius", captainsInRadius);

    if (captainsInRadius.length === 0) {
      return res.status(404).json({ message: "No captains available in your area" });
    }
    ride.otp="";
   
    const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate("user");
// console.log("rideWithUser", rideWithUser);

    captainsInRadius.map(captain=>{

      // console.log("captain", captain);
      // console.log("Ride", ride);

      const captainSocketId = captain.socketID;
      if (captainSocketId) {
            sendMessageToSocketId(captainSocketId, {
              event: "New-ride",
              data: rideWithUser,
            });
          }

    })
      

    

    // Only send response after all checks pass
    res.status(201).json({ message: "Ride created successfully", ride, captainsInRadius });

  } catch (error) {
    console.error("Error in createRide:", error);
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


module.exports.confirmRide=async(req,res)=>{
  const errors = validationResult(req);
  // console.log("errrrrr",errors);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {rideId}=req.body
  try {
    const ride = await rideService.confirmRide({rideId,captain:req.captain})
    
    // console.log("riding...",ride);
    
    sendMessageToSocketId(ride.user.socketID,{
      event:'ride-confirmed',
      data:ride
    })

    return res.status(200).json(ride)

  } catch (error) {
    
    return res.status(500).json({ message: "Internal server error" });
  }
}


module.exports.startRide=async(req,res)=>{
  const errors = validationResult(req);
  // console.log("errrrrr",errors);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {rideId,otp}=req.query
  try {
    const ride = await rideService.startRide({rideId,otp,captain:req.captain})
    
    // console.log("riding...",ride);
    
    sendMessageToSocketId(ride.user.socketID,{
      event:'ride-started',
      data:ride
    })

    return res.status(200).json(ride)

  } catch (error) {
    
    return res.status(500).json({ message: error.message });
  }
}


module.exports.endRide=async(req,res)=>{
  const errors = validationResult(req);
  // console.log("errrrrr",errors);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {rideId}=req.body
  try {
    const ride = await rideService.endRide({rideId,captain:req.captain})
    
    // console.log("riding...",ride);
    
    sendMessageToSocketId(ride.user.socketID,{
      event:'ride-ended',
      data:ride
    })

    return res.status(200).json(ride)

  } catch (error) {
    
    return res.status(500).json({ message: error.message });
  }
}