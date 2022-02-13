const router = require("express").Router();
const updateController = require("../controller/user/update");
const verify = require("../verifyToken");
const loginController = require("../controller/auth/login");

//UPDATE
router.put("/:id",verify,updateController.update);

//LOGIN
//router.post("/login",loginController.login);

module.exports = router;