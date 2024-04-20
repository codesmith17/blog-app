const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const { errorHandler } = require("../utils/error")
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
                    .then(res => res.json("signup successful"))
                    .catch(err => next(err))
            })
            .catch(err => {
                next(err);
            })


    }
};

module.exports = { signup }