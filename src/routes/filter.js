const express = require("express");
const router = express.Router();

const {
  sortByPriceLowToHigh,
  sortByLocation,
  sortMyPropertiesBySize,
  getPropertiesSortedByTime
} = require("../controllers/filter");

const auth = require("../middleware/auth");
router.get("/sort-by-price",auth,sortByPriceLowToHigh);
router.get("/nearestproperties",auth,sortByLocation);
router.get("/sortbysize", auth, sortMyPropertiesBySize); // high to low
router.get("/sortbytime",auth,getPropertiesSortedByTime);
module.exports=router;