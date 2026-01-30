const mongoose = require("mongoose");

const connectDB = async () => {
  const dbstring = process.env.DATABASE_URL;

  if (!dbstring) {
    throw new Error("Database connection string missing");
  }

  await mongoose.connect(dbstring);
};

module.exports = connectDB;
