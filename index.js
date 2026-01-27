const express = require("express");
const app = express();

const connectDB = require("./src/config/database");
const House = require("./src/models/schema1");

app.use(express.json());

app.post("/info", async (req, res) => {
  try {
    const house = new House(req.body);
    await house.save();

    res.status(201).json({
      message: "details updated successfully",
      data: house
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
});

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
