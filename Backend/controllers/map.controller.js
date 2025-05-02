const { validationResult } = require("express-validator");
const mapsService = require("../services/maps.service");

module.exports.getAddressCoordinate = async (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {  
    return res.status(422).json({ errors: errors.array() });
  }
  const { address } = req.query; // Get the address from the query parameters

  if (!address) {
    return res.status(400).json({ message: "Address is required" });
  }

  try {
    const coordinates = await mapsService.getAddressCoordinate(address);
    return res.status(200).json(coordinates);
  } catch (error) {
    return res.status(404).json({ message: "coordinates not found" });
  }
}

module.exports.getDistanceAndTime = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { origin, destination } = req.query; // Get the origin and destination from the query parameters

  if (!origin || !destination) {
    return res.status(400).json({ message: "Origin and destination are required" });
  }

  try {
    const distanceAndTime = await mapsService.getDistanceAndTime(origin, destination);
    return res.status(200).json(distanceAndTime);
  } catch (error) {
    return res.status(404).json({ message: "Distance and time not found" });
  }
}

module.exports.getAutoCompleteSuggestion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { input } = req.query; // Get the input from the query parameters

  if (!input) {
    return res.status(400).json({ message: "Input is required" });
  }

  try {
    const suggestions = await mapsService.getAutoCompleteSuggestion(input);
    return res.status(200).json(suggestions);
  } catch (error) {
    return res.status(404).json({ message: "Suggestions not found" });
  }
}