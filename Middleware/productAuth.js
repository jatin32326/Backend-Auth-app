
const jwt=require("jsonwebtoken");
const ensureAuthenticated =(req,res,next)=>{
    const Auth=req.headers['Authorization']
    if(!Auth){
        return res.status(403).json({message:"unauthorized,jwt token required"})

    }
    try{
        const decoded = jwt.verify(Auth,proccess.env.JWT_SECRET);
        req.user=decoded;
        next();

    }catch(err){
        return res.status(403).json({
            message:"unauthorized,jwt is wrong or expired"
        })

    }
}
module.exports=ensureAuthenticated;