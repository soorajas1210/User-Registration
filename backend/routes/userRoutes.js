const express = require("express");
const userProtect = require("../middlewares/userAuthMiddleware");
const { userRegister, userSignin } = require("../controllers/userController");
const router = express.Router();

router.post("/register", userRegister);
router.post("/signin", userSignin);

module.exports = router;
