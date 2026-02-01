const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  properties,
  getdatabyid,
  getdatabyname,
  updatedetails,
  deletebyid,
  getdatabybrokername
} = require("../controllers/properties");

router.post("/", auth, properties);


router.get("/getbyid/:house_id", auth, getdatabyid);

router.post("/getbyname", auth, getdatabyname);
router.patch("/update", auth, updatedetails);
router.delete("/delete/:house_id", auth, deletebyid);
router.get("/getbybrokername", auth, getdatabybrokername);

module.exports = router;
