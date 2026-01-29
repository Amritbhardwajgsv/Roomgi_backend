const { User, Property } = require("../models/schema1");
// const House = Property;

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


/* ================= GET PROPERTY BY HOUSE_ID (BODY) ================= */
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
      owner_username: req.user.username // 🔐 ownership check
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

/* ================= GET PROPERTY BY OWNER NAME ================= */
const getdatabyname = async (req, res) => {
  try {
    let ownerName = req.body.ownername;

    if (!ownerName) {
      return res.status(400).json({
        success: false,
        message: "owner name is required"
      });
    }

    ownerName = ownerName.trim();

    const data = await House.find({
      Owner_name: { $regex: ownerName, $options: "i" }
    }).select("price_inr city state photo_url");

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

/* ================= UPDATE PROPERTY ================= */
const updatedetails = async (req, res) => {
  try {
    const data=req.body;
    
  }
   catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

/* ================= DELETE PROPERTY ================= */
const deletebyid = async (req, res) => {
  try {
    const { house_id } = req.body;

    if (!house_id) {
      return res.status(400).json({
        message: "house_id is required"
      });
    }

    const deletedHouse = await House.findOneAndDelete({
      house_id,
      owner_username: req.user.username // 🔐 owner check
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
  deletebyid
};
