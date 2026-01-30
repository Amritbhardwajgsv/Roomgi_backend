const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  properties,
  getdatabyid,
  getdatabyname,
  updatedetails,
  deletebyid,getdatabybrokername,
  sortByPriceLowToHigh,sortByLocation,sortMyPropertiesBySize
} = require("../controllers/properties");

/* ================= CREATE PROPERTY ================= */
router.post("/", auth, properties);

/* ================= GET PROPERTY BY ID (BODY) ================= */
router.post("/getbyid", auth, getdatabyid);

/* ================= GET PROPERTY BY OWNER NAME ================= */
router.post("/getbyname", auth, getdatabyname);

/* ================= UPDATE PROPERTY ================= */
router.patch("/update", auth, updatedetails);

/* ================= DELETE PROPERTY ================= */
router.delete("/delete/:house_id", auth, deletebyid);


router.get("/getbybrokername", auth, getdatabybrokername);
router.get("/sort-by-price",auth,sortByPriceLowToHigh);
router.get("/nearestproperties",auth,sortByLocation);
router.get("/sortbysize", auth, sortMyPropertiesBySize); // hight to low
module.exports = router;
