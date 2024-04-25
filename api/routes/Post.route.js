const express = require("express");
const { verifyToken } = require("../utils/verifyUser");
const router = express.Router();
const { createPost, getPosts } = require("../controllers/Post.controller");

router.post('/create', verifyToken, createPost);
router.get("/getPosts", getPosts);
module.exports = router;