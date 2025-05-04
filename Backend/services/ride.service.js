const rideModel = require("../models/ride.model");
const mapsService = require("./maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }
  const distanceTime = await mapsService.getDistanceAndTime(
    pickup,
    destination
  );
  const distance = distanceTime.distance.value; // in meters
  const duration = distanceTime.duration.value; // in seconds

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };
  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };
  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  };

  const fare = {
    auto:
      Math.floor(baseFare.auto +
      (distance / 1000) * perKmRate.auto +
      (duration / 60) * perMinuteRate.auto),
    car:
      Math.floor(baseFare.car +
      (distance / 1000) * perKmRate.car +
      (duration / 60) * perMinuteRate.car),
    motorcycle:
      Math.floor(baseFare.motorcycle +
      (distance / 1000) * perKmRate.motorcycle +
      (duration / 60) * perMinuteRate.motorcycle),
  };

  return fare;
}

function getOtp(num){
    if (!num) {
        throw new Error("Number is required");
    }
    const otp = crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString() // Generate a random 6-digit OTP
    return otp;
}

module.exports.createRide = async ({user, pickup, destination, vehicleType}) => {
 
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("User, pickup, destination, and vehicleType are required");
  }

  const fare = await getFare(pickup, destination);
  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};


module.exports.getFare=getFare;