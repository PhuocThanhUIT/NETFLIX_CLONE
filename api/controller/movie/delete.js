const Movie = require("../../models/Movie");

exports.delete = async (req,res) => {
    if (req.user.isAdmin){
       try{
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("The movie has been deleted!");
       }catch(err){
            res.status(500).json(err);
       }
    } else {
        res.status(403).json("You are not allowed!");
    }
}