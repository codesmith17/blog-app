const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");
dotenv.config();
const signup = (req, res, next) => {
    const { username, email, password } = req.body; {
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            return next(errorHandler(400, "ALL FIELDS ARE REQUIRED"));
        }
        let hashedPassword = "";
        bcrypt.hash(password, 12)
            .then(result => {
                hashedPassword = result;

                // console.log(hashedPassword)
                const newUser = new User({ username: username, email: email, password: hashedPassword });
                newUser.save()
                    .then(result1 => res.json("signup successful"))
                    .catch(err => next(err))
            })
            .catch(err => {
                next(err);
            })


    }
};
const signin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, "ALL FIELDS ARE REQUIRED"));
    }
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return next(errorHandler(404, "USER NOT FOUND"));
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return next(errorHandler(401, "INVALID PASSWORD"));
                    }

                    const token = jwt.sign({
                        id: user._id
                    }, process.env.JWT_SECRET);

                    // Set cookie and send response
                    const { password: pass, ...rest } = user._doc;
                    res.cookie("access_token", token, {
                        httpOnly: true
                    }).status(200).json(rest);
                })
                .catch(err => {
                    console.log(err);
                    next(errorHandler(500, "INTERNAL SERVER ERROR"));
                });
        })
        .catch(err => {
            console.log(err);
            next(errorHandler(500, "INTERNAL SERVER ERROR"));
        });
}


module.exports = { signup, signin }