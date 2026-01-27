const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema(
  {
    house_id: {
      type: String,
      required: true,
      unique: true
    },

    city: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true
    },

    latitude: {
      type: Number,
      required: true
    },

    longitude: {
      type: Number,
      required: true
    },

    price_inr: {
      type: Number,
      required: true
    },

    size_sqft: {
      type: Number,
      required: true
    },

    bedrooms: {
      type: Number,
      required: true
    },

    bathrooms: {
      type: Number,
      required: true
    },

    property_type: {
      type: String,
      enum: [
        "Apartment",
        "Flat",
        "Villa",
        "Independent House",
        "PG",
        "Hostel"
      ],
      required: true
    },

    nearest_hospital: {
      type: String
    },

    hospital_distance_km: {
      type: Number
    },

    nearest_railway_station: {
      type: String
    },

    railway_distance_km: {
      type: Number
    },

    nearest_airport: {
      type: String
    },

    airport_distance_km: {
      type: Number
    },

    year_built: {
      type: Number
    },

    parking: {
      type: String,
      enum: ["Basement", "Open", "Covered", "None"]
    },

    furnishing: {
      type: String,
      enum: ["Unfurnished", "Semi-Furnished", "Fully-Furnished"]
    },

    water_supply: {
      type: String,
      enum: ["Municipal", "Borewell", "Both"]
    },

    power_backup: {
      type: Boolean,
      default: false
    },

    internet: {
      type: String,
      enum: ["Fiber", "Broadband", "None"]
    },

    photo_url: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("House", houseSchema);
