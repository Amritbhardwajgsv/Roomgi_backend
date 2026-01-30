const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const { getFilteredHouses } =
  require("../controllers/house.controller");

router.get("/filter", auth, getFilteredHouses);

module.exports = router;
