require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./src/config/database");

// routes
const userRoutes = require("./src/routes/user");
const propertyRoutes = require("./src/routes/properties");
const houseRoutes = require("./src/routes/house.routes");
const filterRoutes=require("./src/routes/filter");
const app = express();


app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:1234",
      "https://roomgibroker.netlify.app"
    ],
    credentials: true
  })
);


app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/houses", houseRoutes);
app.use("/api/filter",filterRoutes);;

const PORT = process.env.PORT ;

(async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
})();
