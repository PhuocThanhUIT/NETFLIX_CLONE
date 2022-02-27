const List = require("../../models/List");

exports.update = async (req,res) => {
    if (req.user.isAdmin){
       try{
            const updatedList = await List.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {new:true}
            );
            res.status(200).json(updatedList);
       }catch(err){
            res.status(500).json(err);
       }
    } else {
        res.status(403).json("You are not allowed!");
    }
}