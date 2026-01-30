const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  register,
  login,
  logout,deleteMe,Update
} = require("../controllers/user");
router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.delete("/delete", auth, deleteMe);
router.patch("/patch",auth,Update);
router.get("/me", auth, (req, res) => {
  res.status(200).json({
    user: req.user
  });
});

module.exports = router;
