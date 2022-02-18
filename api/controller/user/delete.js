const User = require("../../models/User");

exports.delete = async (req,res) => {
    if (req.user.id === req.params.id || req.user.isAdmin){
        try {
            const deletedUser = await User.findByIdAndDelete(
                req.params.id
            );
            res.status(200).json("User has been deleted...");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can delete only your account!")
    }
}