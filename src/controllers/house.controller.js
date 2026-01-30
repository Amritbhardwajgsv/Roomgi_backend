const { Property } = require("../models/schema1");

const {
  PROPERTY_TYPE_MAP,
  PARKING_MAP,
  FURNISHING_MAP,
  WATER_SUPPLY_MAP,
  INTERNET_MAP,
  normalizeValue
} = require("../utils/normalizeFilters");

const getFilteredHouses = async (req, res) => {
  try {
    // 🔒 STEP 1: START with broker filter (MANDATORY)
    const filters = {
      BrokerId: req.user.uniqueid   // ONLY this broker’s data
    };

    // 🔽 STEP 2: ADD optional filters
    const {
      property_type,
      parking,
      furnishing,
      water_supply,
      internet
    } = req.query;

    if (property_type) {
      const key = normalizeValue(property_type);
      if (PROPERTY_TYPE_MAP[key]) {
        filters.property_type = PROPERTY_TYPE_MAP[key];
      }
    }

    if (parking) {
      const key = normalizeValue(parking);
      if (PARKING_MAP[key]) {
        filters.parking = PARKING_MAP[key];
      }
    }

    if (furnishing) {
      const key = normalizeValue(furnishing);
      if (FURNISHING_MAP[key]) {
        filters.furnishing = FURNISHING_MAP[key];
      }
    }

    if (water_supply) {
      const key = normalizeValue(water_supply);
      if (WATER_SUPPLY_MAP[key]) {
        filters.water_supply = WATER_SUPPLY_MAP[key];
      }
    }

    if (internet) {
      const key = normalizeValue(internet);
      if (INTERNET_MAP[key]) {
        filters.internet = INTERNET_MAP[key];
      }
    }

    // 🔍 STEP 3: QUERY
    const houses = await Property
      .find(filters)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      brokerId: req.user.id,
      count: houses.length,
      data: houses
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { getFilteredHouses };
