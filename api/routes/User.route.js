const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/verifyUser");

const {
    deleteUser,
    getUser,
    getUsers,
    signout,
    test,
    updateUser,
} = require("../controllers/user.controller.js")
router.get("/", test);


router.post('/signout', signout);
router.put("/update/:userId", verifyToken, updateUser);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);

router.delete('/delete/:userId', verifyToken, deleteUser);
module.exports = router;