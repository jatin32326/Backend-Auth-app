const express=require("express")
const router=express.Router()
const ensureAuthenticated=require("../Middleware/productAuth")

router.get("/",ensureAuthenticated,(req,res)=>{
    console.log("----logged in user----",req.user);
    res.status(200).json([
        {
            name:"Mobile",
            price:12000
        },
        {
            name:"Television",
            price:20000
        }
    ])
});
module.exports=router;