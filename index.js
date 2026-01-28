const express = require("express");
const app = express();

const connectDB = require("./src/config/database");
app.use(express.json());

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
