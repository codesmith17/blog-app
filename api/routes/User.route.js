const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/verifyUser");
const { test, updateUser, deleteUser } = require("../controllers/User.controller");
router.get("/", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
module.exports = router;