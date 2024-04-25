const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/verifyUser");
const { test, updateUser } = require("../controllers/User.controller");
router.get("/", test);
router.put("/update/:userId", verifyToken, updateUser)
module.exports = router;