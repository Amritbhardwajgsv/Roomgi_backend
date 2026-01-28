const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema(
  {
    house_id: {
      type: String,
      unique: true
    },

    city: { type: String, required: true },
    state: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    price_inr: { type: Number, required: true },
    size_sqft: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },

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

    nearest_hospital: String,
    hospital_distance_km: Number,
    nearest_railway_station: String,
    railway_distance_km: Number,
    nearest_airport: String,
    airport_distance_km: Number,
    year_built: Number,

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

    photo_url: String,

    Owner_name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    Apartment_name: String,

    status: {
      type: String,
      enum: ["sold", "notsold"],
      default: "notsold"
    },

    brokername: {
      type: String,
      required: true
    },
    ownerId: {
      type: String,
      required: true,
      unique:true
    }
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
const userschema=new mongoose.Schema({
  username:{
    type:String,
    minLength:3,
    maxLength:10,
    required:true,
    trim:true,
    unique:true,
  } ,
  password:{
    type:String,
    minLength:7,
    maxLength:20,
    required:true
  } ,
  emailId:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
  },
  age:{
    type:Number,
    required:true,
    min:20,
    max:120
  },
  uniqueid:{
    type:String,
    unique:true
  }
})
const User=mongoose.model("User",userschema);
const Property=mongoose.model("properties",houseSchema);
module.exports={User,Property};