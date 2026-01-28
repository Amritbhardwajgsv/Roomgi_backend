require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./src/config/database");

const userRoutes = require("./src/routes/user");
const propertyRoutes = require("./src/routes/properties");

// middleware
app.use(express.json());


app.use("/api/user", userRoutes);
app.use("/api/property", propertyRoutes);

const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
  });
