const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    profilePicture: {
        type: String,
        default: "https://wallpapercave.com/wp/wp12696718.jpg"
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
module.exports = User;