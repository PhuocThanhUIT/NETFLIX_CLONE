const List = require("../../models/List");

exports.delete = async (req,res) => {
    if (req.user.isAdmin){
       try{
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json("The list has been deleted!");
       }catch(err){
            res.status(500).json(err);
       }
    } else {
        res.status(403).json("You are not allowed!");
    }
}