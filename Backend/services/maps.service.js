const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinate = async (address) => {
    if (!address) {
        throw new Error("Address is required");
    }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Make sure to set this in your environment variables
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const results = response.data.results;

    if (results && results.length > 0) {
      const location = results[0].geometry.location;
    //   console.log("location", location);
      
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("No results found for the given address.");
    }
  } catch (error) {
    throw new Error(`Failed to get coordinates: ${error.message}`);
  }
};

module.exports.getDistanceAndTime = async (origin, destination) => {

    if(!origin || !destination) {
        throw new Error("Origin and destination are required");
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY; 
    const encodedOrigin = encodeURIComponent(origin);
    const encodedDestination = encodeURIComponent(destination);
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedOrigin}&destinations=${encodedDestination}&key=${apiKey}`;

    try{
        const response = await axios.get(url);
        const data = response.data;
        if (data.rows && data.rows.length > 0) {
            const elements = data.rows[0].elements;
            if (elements && elements.length > 0) {
                const distance = elements[0].distance;
                const duration = elements[0].duration;
                return { distance, duration };
            } else {
                throw new Error("No elements found for the given origin and destination.");
            }
        } else {
            throw new Error("No rows found for the given origin and destination.");
        }

    }catch (error) {
        throw new Error(`Failed to get distance and time: ${error.message}`);
    }
}

module.exports.getAutoCompleteSuggestion = async (input) => {
    if(!input) {
        throw new Error("Input is required");
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY; 
    const encodedInput = encodeURIComponent(input);
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedInput}&key=${apiKey}`;

    try{
        const response = await axios.get(url);
        const predictions = response.data.predictions;
        if (predictions && predictions.length > 0) {
            return predictions;
        } else {
            throw new Error("No suggestions found for the given input.");
        }
    }catch (error) {
        throw new Error(`Failed to get suggestions: ${error.message}`);
    }
}

module.exports.getCaptainsInTheRadius = async (ltd,lng,radius)=>{
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, ltd], radius / 6371] // radius in miles
            }
        }
    });
    return captains;
}