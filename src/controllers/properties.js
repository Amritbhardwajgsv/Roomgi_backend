

const House = require("../models/schema1");
const properties=async (req,res)=>{
 try {
    const house = new House(req.body);
    await house.save();

    res.status(201).json({
      message: "details updated successfully",
      data: house
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
}
module.exports={properties};