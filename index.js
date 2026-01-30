require("dotenv").config();

const express = require("express");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const connector=require('./src/routes/properties');
const userRoutes=require("./src/routes/user");
const propertyRoutes=require("./src/routes/properties");
const connectDB=require("./src/config/database");
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:1234", // Parcel frontend
  credentials: true
}));



app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/property", propertyRoutes);

const PORT = process.env.PORT || 3000;

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
