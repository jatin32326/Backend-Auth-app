const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const AuthRouter=require("./Router/auth");
const cors=require("cors")
const productRouter=require("./Router/productRouter")

const models=require("./models/db")

const PORT=process.env.PORT||3000;
app.use(bodyParser.json());
app.use(cors({
    origin:"https://frontend-auth-app-rho.vercel.app",
    credentials:true,
}));
app.use("/auth",AuthRouter);
app.use("/products",productRouter);

app.get("/test",(req,res)=>{
    res.send("test is done")
})

app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
});
