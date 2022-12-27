const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("dotenv").config({path:"/Users/rohanmote/Test_MERN_Project/MERN_Project/.env"});

const URI = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.t29pu2w.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose.connect(URI)
.then(()=>{
    console.log("Database Connected Successfully..");
})
.catch((err)=>{
    console.log(err);
});


