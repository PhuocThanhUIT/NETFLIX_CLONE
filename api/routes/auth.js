const router = require("express").Router();
const registerController = require("../controller/auth/register");
const loginController = require("../controller/auth/login");

//REGISTER
router.post("/register",registerController.register);

//LOGIN
router.post("/login",loginController.login);

module.exports = router;