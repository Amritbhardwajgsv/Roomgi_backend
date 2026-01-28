const express=require('express');
const router=express.Router();
const {properties,getdatabyid,getdatabyname}=require('../controllers/properties')
router.route("/").post(properties);

router.route("/getbyname").get(getdatabyname);
//always put this route down 
router.route("/:id").get(getdatabyid);
module.exports=router;