const express = require("express");
const userProtect = require("../middlewares/userAuthMiddleware");
const { userRegister, userSignin, getUserInfo, editUser } = require("../controllers/userController");
const router = express.Router();

router.post("/register", userRegister);
router.post("/signin", userSignin);
router.get("/getUserInfo", userProtect, getUserInfo);
router.patch("/editUser", userProtect, editUser);

module.exports = router;
