const Movie = require("../../models/Movie");

exports.update = async (req,res) => {
    if (req.user.isAdmin){
       try{
            const updatedMovie = await Movie.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {new:true}
            );
            res.status(200).json(updatedMovie);
       }catch(err){
            res.status(500).json(err);
       }
    } else {
        res.status(403).json("You are not allowed!");
    }
}