const express = require("express");
const { verifyToken } = require("../utils/verifyUser");
const router = express.Router();
const { createPost, getPosts, deletepost, updatepost } = require("../controllers/Post.controller");

router.post('/create', verifyToken, createPost);
router.get("/getPosts", getPosts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost);
router.put('/updatepost/:postId/:userId', verifyToken, updatepost)
module.exports = router;