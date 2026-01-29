const { User } = require("../models/schema1");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {Property}=require("../models/schema1");

const register = async (req, res) => {
  try {
    const { username, emailId, password, age } = req.body;

    if (!username || !emailId || !password || !age) {
      return res.status(400).json({ message: "Fields missing" });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const emailExists = await User.findOne({ emailId });
    if (emailExists) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const brokerId = crypto.randomUUID();

    await User.create({
      username,
      emailId,
      password: hashedPassword,
      age,
      uniqueid: brokerId
    });

    const token = jwt.sign(
      { username, uniqueid: brokerId },
      process.env.SECRETKEY,
      { expiresIn: "30m" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Fields missing" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { username: user.username, uniqueid: user.uniqueid },
      process.env.SECRETKEY,
      { expiresIn: "30m" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteMe = async (req, res) => {
  try {
    const brokerId = req.user.uniqueid;

    await Property.deleteMany({BrokerId:brokerId});
    await User.deleteOne({ uniqueid: brokerId });
    res.clearCookie("token");

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const Update = async (req, res) => {
  try {
    const brokerId = req.user.uniqueid;
    const allowedFields = ["age", "emailId"];
    const updates = {};

    for (let key of allowedFields) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const user = await User.findOneAndUpdate(
      { uniqueid: brokerId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {register, login, logout, deleteMe,Update};
