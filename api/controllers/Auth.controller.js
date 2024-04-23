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
                    .then(() => res.json("signup successful"))
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
const google = async(req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            res
                .status(200)
                .cookie('access_token', token, { httpOnly: true })
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') +
                    Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET);
            const { password: newUserPassword, ...rest } = newUser._doc;
            res
                .status(200)
                .cookie('access_token', token, { httpOnly: true })
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};


module.exports = { signup, signin, google }