const User = require("../../models/User");

exports.getAll = async (req,res) => {
    const query = req.query.new;
    console.log(query);
    if (req.user.isAdmin){
        try {
            const users = query ? await User.find().sort({_id:-1}).limit(10) : await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed to see all users!");
    }
}