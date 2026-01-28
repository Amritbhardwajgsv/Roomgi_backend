const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema(
  {
    house_id: {
      type: String,
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
    },
    Owner_name:{
      type:String,
      required:true,
      lowercase:true,
     trim:true,
    },
    Apartment_name:{
      type:String,
    },
    status:{
      type:String,
      default:"notsold",
      enum:["sold","notsold"],
      required:true,
    },
    
  },
  {
    timestamps: true
  }
  
);

houseSchema.pre("save", async function () {
  try {
    if (this.house_id) return;

    const properties = mongoose.model("properties");
    const cursor = properties.find().cursor();

    let previd = "";

    for await (const house of cursor) {
      if (!house.createdAt) continue;

      const creat = house.createdAt.getTime();

      if (previd === "") {
        const initialnumber = 1;

        previd =
          String(creat) +
          String(initialnumber).padStart(4, "0");
      } else {
        const last4 = parseInt(previd.slice(-4));
        const next_id = last4 + 1;

        previd =
          String(creat) +
          String(next_id).padStart(4, "0");
      }
    }

 
    if (previd === "") {
      const creat = Date.now();
      previd = String(creat) + "0001";
    }

    this.house_id = `H${previd}`;
  } catch (error) {
    console.error("house_id generation failed:", error);
    throw error; 
  }
});

module.exports=mongoose.model("properties",houseSchema);
