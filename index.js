const express = require("express");
const cors=require("cors");
const app = express();

const connectDB = require("./src/config/database");
app.use(express.json());
app.use(cors());
const connector=require('./src/routes/properties');

app.use("/api/property",connector);
// this is for adding the details of the properties 

connectDB()
  .then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
      console.log("listening at port 3000");
    });
  })
  .catch(err => {
    console.log(err);
  });
