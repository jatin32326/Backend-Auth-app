const mongoose = require('mongoose');

const mongo_Url=process.env.MONGO_CONN

 const DB=mongoose.connect(mongo_Url).then(()=>{
    console.log("mongo db connected ..")
}).catch((err)=>{
    console.log("error",err);
});

module.exports=DB;

