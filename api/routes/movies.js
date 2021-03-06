const router = require("express").Router();
const verify = require("../verifyToken");
const createController = require("../controller/movie/create");
const updateController = require("../controller/movie/update");
const deleteController = require("../controller/movie/delete");
const getController = require("../controller/movie/get");
const getRandomController = require("../controller/movie/getRandom");
const getAllController = require("../controller/movie/getAll");


//CREATE 
router.post("/",verify,createController.create);

//UPDATE
router.put("/:id",verify,updateController.update);

//DELETE
router.delete("/:id",verify,deleteController.delete);

//GET
router.get("/find/:id",verify,getController.get);

//GET RANDOM
router.get("/random",verify,getRandomController.getRandom);

//GET ALL
router.get("/",verify,getAllController.getAll);

module.exports = router;