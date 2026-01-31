const { User, Property } = require("../models/schema1");
const sortByPriceLowToHigh = async (req, res) => {
  try {
    const properties = await Property.find({
      BrokerId: req.user.uniqueid
    }).sort({ price_inr: 1 });

    res.status(200).json({
      count: properties.length,
      data: properties
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const sortByLocation = async (req, res) => {
  try {
    const brokerId = req.user.uniqueid;

    const user = await User.findOne({ uniqueid: brokerId });

    if (
      !user ||
      !user.locationcoordinates ||
      !user.locationcoordinates.coordinates
    ) {
      return res.status(400).json({
        message: "User location not found"
      });
    }

    const [longitude, latitude] =
      user.locationcoordinates.coordinates;

    const properties = await Property.find({
      BrokerId: { $ne: brokerId },
      locationcoordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          }
        }
      }
    }).limit(10);

    res.status(200).json({
      properties
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};


const sortMyPropertiesBySize = async (req, res) => {
  try {
    const brokerId = req.user.uniqueid;

    const order = req.query.order === "asc" ? 1 : -1;

    const properties = await Property.find({
      BrokerId: brokerId   
    })
      .sort({ size_sqft: order })
      .limit(20); 

    res.status(200).json({
      properties
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPropertiesSortedByTime = async (req, res) => {
  try {
    const brokerId = req.user.id; 

    const properties = await Property.find({ brokerId })
      .sort({ createdAt: -1 }); 

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
module.exports = {
 sortByPriceLowToHigh,sortByLocation,sortMyPropertiesBySize ,getPropertiesSortedByTime
};
