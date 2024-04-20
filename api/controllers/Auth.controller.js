const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const signup = (req, res, next) => {
    const { username, email, password } = req.body; {
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            return res.status(400).json({ message: "ALL FIELDS SHOULD BE FIELD" });
        }
        let hashedPassword = "";
        bcrypt.hash(password, 12)
            .then(result => {
                hashedPassword = result;

                // console.log(hashedPassword)
                const newUser = new User({ username: username, email: email, password: hashedPassword });
                newUser.save()
                    .then(res => res.json("signup successful"))
                    .catch(err => res.json(err))
            })
            .catch(err => {
                console.log(err);
            })


    }
};

module.exports = { signup }