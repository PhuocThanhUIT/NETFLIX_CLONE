const router = require("express").Router();
const updateController = require("../controller/user/update");
const verify = require("../verifyToken");
const deleteController = require("../controller/user/delete");
const getController = require("../controller/user/get");
const getAllController = require("../controller/user/getAll");
const getStatsController = require("../controller/user/getStats");

//UPDATE
router.put("/:id",verify,updateController.update);

//DELETE
router.delete("/:id",verify,deleteController.delete);

//Get
router.get("/find/:id",getController.get);

//getAll
router.get("/",verify, getAllController.getAll);

//getStats
router.get("/stats",getStatsController.getStats);

module.exports = router;