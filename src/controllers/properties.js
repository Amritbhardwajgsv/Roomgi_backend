

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
const getdatabyid=async (req,res)=>{
    try{
    const id=req.params.id;
    const house =await House.findOne({house_id:id});
    if(!house){
        return res.status(404).json({
            message:"property not found"
        });
    }
    res.status(200).json(house);
    }
    catch (error){
        res.status(500).json({
            error:error.message
        });
    }
}
const getdatabyname = async (req, res) => {
  try {
    let ownerName = req.query.ownername;

    if (!ownerName) {
      return res.status(400).json({
        success: false,
        message: "owner name is required"
      });
    }

    ownerName = ownerName.trim();

    const data = await House.find({
      Owner_name: { $regex: ownerName, $options: "i" }
    })
    .select("price_inr city state photo_url");

    res.status(200).json({
      success: true,
      count: data.length,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports={properties,getdatabyid,getdatabyname};