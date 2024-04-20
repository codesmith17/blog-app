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
    .catch(err => console.log(err))
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
    console.log("SERVER IS RUNNING ON PORT 3000");
})