const { User, Property } = require("../models/schema1");
const House = Property;

const properties = async (req, res) => {
  try {
    console.log(req.body);
    const house = new Property({
      ...req.body,                 // property data from client
      BrokerId: req.user.uniqueid,
      brokername :req.user.username
    });
    console.log(house);
    await house.save();

    res.status(201).json({
      message: "Property added successfully",
      data: house
    });

  } 
  catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


const getdatabyid = async (req, res) => {
  try {
    const { house_id } = req.body;

    if (!house_id) {
      return res.status(400).json({
        message: "house_id is required"
      });
    }

    const house = await House.findOne({
      house_id,
      owner_username: req.user.username // 
    });

    if (!house) {
      return res.status(404).json({
        message: "property not found"
      });
    }

    res.status(200).json(house);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


const getdatabyname = async (req, res) => {
  try {
    let ownerName = req.body.brokername;

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
    .select("price_inr city state photo_url size_sqft house_id");

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

const getdatabybrokername = async (req, res) => {
  try {

    const brokername = req.user.username;

    const data = await Property.find({
      brokername: brokername
    }).select(
      "price_inr city state photo_url size_sqft house_id"
    );

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

    const updatedProperty = await Property.findOneAndUpdate(
      {
        house_id: house_id,
        BrokerId: req.user.uniqueid   
      },
      {
        $set: updateData
      },
      {
        new: true,       
        runValidators: true
      }
    );

    if (!updatedProperty) {
      return res.status(404).json({
        message: "Property not found or unauthorized"
      });
    }

    res.status(200).json({
      message: "Property updated successfully",
      data: updatedProperty
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
        message: "house_id is required"
      });
    }

    const deletedHouse = await Property.findOneAndDelete({
      house_id,
      BrokerId: req.user.uniqueid   
    });

    if (!deletedHouse) {
      return res.status(404).json({
        message: "property not found or unauthorized"
      });
    }

    res.status(200).json({
      message: "property deleted successfully",
      data: deletedHouse
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  properties,
  getdatabyid,
  getdatabyname,
  updatedetails,
  deletebyid,getdatabybrokername
};
