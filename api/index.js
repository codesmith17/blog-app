const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose");
dotenv.config();
mongoose.connect(process.env.MONGO)
    .then(res => {
        console.log("CONNECTED");
    })
    .catch(err => console.log(err))
app.listen(3000, () => {
    console.log("SERVER IS RUNNING ON PORT 3000");
})