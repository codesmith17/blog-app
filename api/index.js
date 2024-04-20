const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const userRoutes = require("./routes/User.route");
const authRoutes = require("./routes/Auth.route");
dotenv.config();
app.use(express.json())
mongoose.connect(process.env.MONGO)
    .then(res => {
        console.log("CONNECTED");
    })
    .catch(err => next(err))
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "INTERNAL SERVER ERROR";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
app.listen(3000, () => {
    console.log("SERVER IS RUNNING ON PORT 3000");
})