const mongoose = require("mongoose");

/* ================= USER SCHEMA ================= */

const userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
      trim: true,
      unique: true
    },

    password: {
      type: String,
      minLength: 7,
      required: true
    },

    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    age: {
      type: Number,
      required: true,
      min: 20,
      max: 120
    },

    uniqueid: {
      type: String,
      unique: true
    },

    location: {
      type: String,
      required: true
    },
    image_url :{
      type:string
    },
    locationcoordinates: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  { timestamps: true }
);

userschema.index({ locationcoordinates: "2dsphere" });

const User = mongoose.model("User", userschema);

/* ================= PROPERTY SCHEMA ================= */

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

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },

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

    Owner_name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    status: {
      type: String,
      enum: ["sold", "notsold"],
      default: "notsold"
    },

    brokername: {
      type: String,
      required: true
    },
  image_url:{
    type:String
  },
    BrokerId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

houseSchema.pre("save", function () {
  if (!this.house_id) {
    this.house_id = `H${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
});


houseSchema.index({ location: "2dsphere" });

const Property = mongoose.model("properties", houseSchema);

module.exports = { User, Property };
