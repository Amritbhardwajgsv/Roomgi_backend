const express=require('express');
const router=express.Router();
const {properties}=require('../controllers/properties')
router.route("/").post(properties);
module.exports=router;