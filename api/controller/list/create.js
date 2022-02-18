const List = require("../../models/List");

exports.create = async (req,res) => {
    if (req.user.isAdmin){
       const newList = new List(req.body);
       try{
            const savedList = await newList.save();
            res.status(201).json(savedList);
       }catch(err){
            res.status(500).json(err);
       }
    } else {
        res.status(403).json("You are not allowed!");
    }
}