const Movie = require("../../models/Movie");

exports.create = async (req,res) => {
    if (req.user.isAdmin){
       const newMovie = new Movie(req.body);
       try{
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
       }catch(err){
            res.status(500).json(err);
       }
    } else {
        res.status(403).json("You are not allowed!");
    }
}