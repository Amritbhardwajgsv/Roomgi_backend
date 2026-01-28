const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout
} = require("../controllers/user");
const auth = require("../middleware/auth");
router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout);
// router.delete("/delete", auth, deleting);
module.exports = router;
