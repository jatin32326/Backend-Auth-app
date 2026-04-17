const express = require("express");
const { signupValidation, loginValidation } = require("../Middleware/AuthValidation");
const { signup, login } = require("../controller/AuthController");
const router=express.Router();

router.post("/login",loginValidation,login)
router.post("/signup",signupValidation,signup);
module.exports=router;