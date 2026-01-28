const {User,Property} = require("../models/schema1");
const House=Property;
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
const updatedetails = async (req, res) => {
  try {
    const { house_id, ...updateData } = req.body;

    if (!house_id) {
      return res.status(400).json({
        message: "house_id is required"
      });
    }

    const updatedHouse = await House.findOneAndUpdate(
      { house_id: house_id },
      { $set: updateData },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedHouse) {
      return res.status(404).json({
        message: "property not found"
      });
    }

    res.status(200).json({
      message: "property updated successfully",
      data: updatedHouse
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
const deletebyid = async (req, res) => {
  try {
    const { house_id } = req.params;

    if (!house_id) {
      return res.status(400).json({
        success: false,
        message: "house_id is required"
      });
    }

    const deletedHouse = await House.findOneAndDelete({
      house_id: house_id
    });

    if (!deletedHouse) {
      return res.status(404).json({
        success: false,
        message: "property not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "property deleted successfully",
      data: deletedHouse
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// some fields that cant be changed or updated are price_inr house id 
module.exports={properties,getdatabyid,getdatabyname,updatedetails,deletebyid};