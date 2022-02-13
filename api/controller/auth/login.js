const User = require("../../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try{
        const user = await User.findOne({email:req.body.email});
        if (!user) {
            res.status(401).json("Wrong password or username");
        }
        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (originalPassword !== req.body.password){
            res.status(401).json("Wrong password or username");
        }
        const accessToken = jwt.sign({id: user._id,isAdmin: user.isAdmin},process.env.SECRET_KEY,{expiresIn: '24h'});
        const {password,...info}=user._doc;
        res.status(200).json({...info,accessToken});
    } catch(err){
        res.status(500).json(err);
    }
    
}