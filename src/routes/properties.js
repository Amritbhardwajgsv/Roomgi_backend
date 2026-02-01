const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  properties,
  getdatabyid,
  getdatabyname,
  updatedetails,
  deletebyid,getdatabybrokername,
  sortByPriceLowToHigh,sortByLocation,sortMyPropertiesBySize,getPropertiesSortedByTime
} = require("../controllers/properties");

router.post("/", auth, properties);

router.get("/getbyid", auth, getdatabyid);

router.post("/getbyname", auth, getdatabyname);

router.patch("/update", auth, updatedetails);

router.delete("/delete/:house_id", auth, deletebyid);


router.get("/getbybrokername", auth, getdatabybrokername);
module.exports = router;
