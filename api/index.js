const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const userRoutes = require("./routes/User.route")
dotenv.config();
mongoose.connect(process.env.MONGO)
    .then(res => {
        console.log("CONNECTED");
    })
    .catch(err => console.log(err))
app.use("/api/user", userRoutes)
app.listen(3000, () => {
    console.log("SERVER IS RUNNING ON PORT 3000");
})