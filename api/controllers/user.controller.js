const User = require("../models/User.model");
const { errorHandler } = require("../utils/error");
const bcrypt = require("bcryptjs");

const test = (req, res, next) => {
    res.json({ message: "WORKING" });
};

const updateUser = (req, res, next) => {
    if (req.user._id !== req.params.id) {
        return next(errorHandler(403, "YOU ARE NOT ALLOWED TO UPDATE THIS USER"));
    }

    if (req.body.password && req.body.password.length < 6) {
        return next(errorHandler(400, "PASSWORD LENGTH SHOULD BE AT LEAST 6"));
    }

    if (req.body.username && (req.body.username.length < 7 || req.body.username.length > 20)) {
        return next(errorHandler(400, "USERNAME LENGTH SHOULD BE BETWEEN 7 AND 20"));
    }

    if (req.body.username && req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, "USERNAME MUST BE LOWERCASE"));
    }

    if (req.body.username && req.body.username.includes(" ")) {
        return next(errorHandler(400, "USERNAME CANNOT CONTAIN SPACES"));
    }

    if (req.body.username && !req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(errorHandler(400, "USERNAME CAN ONLY CONTAIN NUMBERS AND CHARACTERS"));
    }

    const updateUserObject = {};
    if (req.body.username) updateUserObject.username = req.body.username;
    if (req.body.email) updateUserObject.email = req.body.email;
    if (req.body.profilePicture) updateUserObject.profilePicture = req.body.profilePicture;
    if (req.body.password) {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) return next(err);
            updateUserObject.password = hashedPassword;
            updateUserObject.updatedAt = new Date();
            updateUserObject.save()
                .then(updatedUser => {
                    const { password, ...rest } = updatedUser._doc;
                    res.status(200).json(rest);
                })
                .catch(err => {
                    next(err);
                });
        });
    } else {
        updateUserObject.updatedAt = new Date();
        User.findByIdAndUpdate(req.params.userId, updateUserObject, { new: true })
            .then(updatedUser => {
                const { password, ...rest } = updatedUser._doc;
                res.status(200).json(rest);
            })
            .catch(err => {
                next(err);
            });
    }
};

module.exports = { test, updateUser };