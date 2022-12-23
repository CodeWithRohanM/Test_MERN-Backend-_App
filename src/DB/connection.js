const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("dotenv").config({path:"/Users/rohanmote/Test_MERN_Project/MERN_Project/.env"});

const URI = "mongodb://localhost:27017/Test_MERN_App";

mongoose.connect(URI)
.then(()=>{
    console.log("Database Connected Successfully..");
})
.catch((err)=>{
    console.log(err);
});


