const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
    required: false,
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  distance: {
    type: String, //in meters
  },
  duration: {
    type: String, //in seconds
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },
  paymentID: {
    type: String,
    required: false,
  },
  orderID: {
    type: String,
    required: false,
  },
  signature: {
    type: String,
    required: false,
  },
  otp:{
    type: String,
    select: false,
    required:true,
  }
});

const rideModel = mongoose.model("ride", rideSchema); 

module.exports = rideModel; 