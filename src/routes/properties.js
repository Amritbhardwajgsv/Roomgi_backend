const express=require('express');
const router=express.Router();
const {properties,getdatabyid,getdatabyname,updatedetails,deletebyid}=require('../controllers/properties')
router.route("/").post(properties);
router.route("/getbyname").get(getdatabyname);
router.route("/update").patch(updatedetails);
router.route("/delete/:house_id").delete(deletebyid);
//always put this route down 
router.route("/:id").get(getdatabyid);
module.exports=router;