const { User } = require("../models/schema1");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const register = async (req, res) => {
  try {
    const mandatoryfield = ["username", "password", "emailId"];

    const isallowed = mandatoryfield.every((k) =>
      Object.keys(req.body).includes(k)
    );

    if (!isallowed) {
      return res.status(400).json({ message: "Fields missing" });
    }
    const { username, emailId } = req.body;
    const username_check = await User.findOne({ username });
    const emailId_check= await User.findOne({emailId});
    if(username_check !=null){
        res.status(409).json("Username already exists");
    }
    if(emailId_check !=null){
        res.status(409).json("emailId is already taken");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const uniqueIdd = crypto.randomUUID();
    await User.create({
      username: req.body.username,
      password: hashedPassword,
      emailId: req.body.emailId,
      age:req.body.age,
      uniqueid:uniqueIdd
    });
    const token_register = jwt.sign(
      { username: req.body.username, emailId: req.body.emailId },
      process.env.SECRETKEY,
      { expiresIn: "1800s" }
    );
     res.cookie("token", token_register, {
        httpOnly: true,
        secure: false, 
        sameSite: "strict"
      }) 
    res.status(201).json({ message: "User registered successfully"});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    const token = jwt.sign(
      { username: user.username, emailId: user.emailId },
      process.env.SECRETKEY,
      { expiresIn: "1800s" }
    );

     res.cookie("token", token, {
        httpOnly: true,
        secure: false, 
        sameSite: "strict"
      })

    res.status(201).json({
      message: "Login successful",
    });


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logout=async (req,res)=>{
    try{
        res.clearCookie("token");// After logout the UI must change.
        res.status(201).json({message:"Logged out Successfully"});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
// const deleting=async(req,res)=>{
//     const {emailId}=req.body;
//     try{
//         await User.deleteOne({req.body.emailId})
//     }
//     catch(err){
//         res.status(500).json({error:err.message});
//     }
// }
module.exports = { register, login ,logout };