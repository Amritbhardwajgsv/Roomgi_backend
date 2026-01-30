const express = require("express");
const router = express.Router();

// ✅ correct middleware import
const auth = require("../middleware/auth");

const { getFilteredHouses } =
  require("../controllers/house.controller");

console.log("✅ house.routes.js loaded");

// ✅ use auth middleware
router.get("/filter", auth, getFilteredHouses);

module.exports = router;
