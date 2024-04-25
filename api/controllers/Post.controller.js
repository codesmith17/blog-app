const Post = require("../models/Post.model");
const errorHandler = require("../utils/error");

const createPost = async(req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a post'));
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }
    const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
};

const getPosts = (req, res, next) => {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const query = {};
    if (req.query.userId) query.userId = req.query.userId;
    if (req.query.category) query.category = req.query.category;
    if (req.query.slug) query.slug = req.query.slug;
    if (req.query.postId) query._id = req.query.postId;
    if (req.query.searchTerm) {
        query.$or = [
            { title: { $regex: req.query.searchTerm, $options: 'i' } },
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ];
    }

    Post.find(query)
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit)
        .then(posts => {
            const totalPostsPromise = Post.countDocuments();
            const now = new Date();
            const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            const lastMonthPostsPromise = Post.countDocuments({ createdAt: { $gte: oneMonthAgo } });
            return Promise.all([totalPostsPromise, lastMonthPostsPromise, posts]);
        })
        .then(([totalPosts, lastMonthPosts, posts]) => {
            res.status(200).json({ posts, totalPosts, lastMonthPosts });
        })
        .catch(error => {
            next(error);
        });
};
const updatepost = async(req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this post'));
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId, {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    category: req.body.category,
                    image: req.body.image,
                },
            }, { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
};
const deletepost = async(req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this post'));
    }
    // try {
    //     await Post.findByIdAndDelete(req.params.postId);
    //     res.status(200).json('The post has been deleted');
    // } catch (error) {
    //     next(error);
    // }
    Post.findByIdAndDelete(req.params.postId)
        .then(result => {
            return res.status(200).json("THE POST HAS BEEN DELETED")
        })
        .catch(error => {
            next(error);
        })
};

module.exports = { createPost, getPosts, deletepost, updatepost }