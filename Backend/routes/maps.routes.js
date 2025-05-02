const express = require("express");
const mapController = require("../controllers/map.controller");
const authmiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const { query } = require("express-validator");

router.get(
  "/get-Coordinate",
  query("address").isString().isLength({ min: 3 }),
  authmiddleware.authUser,
  mapController.getAddressCoordinate
);

router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authmiddleware.authUser,
  mapController.getDistanceAndTime
);

router.get('/get-suggestion',
    query('input').isString().isLength({ min: 3 }),
    authmiddleware.authUser,
    mapController.getAutoCompleteSuggestion
)


module.exports = router;
