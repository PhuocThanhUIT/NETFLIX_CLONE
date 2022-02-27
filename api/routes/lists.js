const router = require("express").Router();
const verify = require("../verifyToken");
const createController = require("../controller/list/create");
const deleteController = require("../controller/list/delete");
const getController = require("../controller/list/get");
const updateController = require("../controller/list/update");



//CREATE 
router.post("/",verify,createController.create);

//UPDATE
router.put("/:id",verify,updateController.update);

//DELETE
router.delete("/:id",verify,deleteController.delete);

//GET
router.get("/",verify,getController.get);

//GET RANDOM
//router.get("/random",verify,getRandomController.getRandom);

//GET ALL
//router.get("/",verify,getAllController.getAll);

module.exports = router;