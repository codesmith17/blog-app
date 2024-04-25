const express = require("express");
const app = express();
const postRoutes = require("./routes/Post.route");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const userRoutes = require("./routes/User.route");
const authRoutes = require("./routes/Auth.route");
const commentRoutes = require("./routes/Comment.route");
const cookieParser = require("cookie-parser");
dotenv.config();
app.use(express.json());
app.use(cookieParser());
mongoose.connect(process.env.MONGO)
    .then(res => {
        console.log("CONNECTED");
    })
    .catch(err => console.log(err));
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/comment', commentRoutes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "INTERNAL SERVER ERROR";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
    next() // Add this line to prevent further execution
});

app.listen(3000, () => {
    console.log("SERVER IS RUNNING ON PORT 3000");
})