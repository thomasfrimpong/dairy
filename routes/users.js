const express = require("express");

const router = express.Router();
const { getUserInfo } = require("../controllers/users");
const { protect } = require("../middleware/auth");

//Get all the user
router.get("/", protect, getUserInfo);

module.exports = router;
