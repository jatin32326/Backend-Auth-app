const UserModel = require("../models/user");
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")

const signup = async (req, res) => {
    try {
        console.log("signup route ");
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(409)
                .json({ message: "user is already exist,You can login", success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10)
        const showDb=await userModel.save();
        console.log(showDb)
        res.status(209)
            .json({ message: "signup successfully", success: true })

    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error", success: false })

    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email })
        const errMsg ="Authentication failed username or password is wrong";
        if (!user) {
            return res.status(403)
                .json({ message: errMsg, success: false });
        }
        const ispassEqual=await bcrypt.compare(password,user.password)
        if(!ispassEqual){
            return res.status(403)
            .json({message: errMsg,success:false});     
        }
        const JwtToken = jwt.sign(
            {email:user.email,_id:user.id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )
        res.status(200)
            .json({ message: "login successfully", 
                success: true,
                JwtToken,
                email,
                name:user.name
                
             })

    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error", 
                success: false })

    }
}
module.exports = {
    signup,login
}