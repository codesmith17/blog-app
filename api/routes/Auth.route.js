const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/Auth.controller")
router.post("/signup", signup);
module.exports = router;