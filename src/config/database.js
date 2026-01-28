const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbstring = process.env.DATABASE_URL

    if (!dbstring) {
      throw new Error("Database connection string missing");
    }

    await mongoose.connect(dbstring);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

module.exports = connectDB;
