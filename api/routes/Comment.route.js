const express = require("express")
const { verifyToken } = require("../utils/verifyUser");
// import { createComment } from '../controllers/comment.controller.js';
const { createComment, getPostComments, likeComment, editComment, deleteComment, getcomments, } = require("../controllers/Comment.controller.js");
const router = express.Router();

router.put('/editComment/:commentId', verifyToken, editComment);
router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getcomments);
module.exports = router;