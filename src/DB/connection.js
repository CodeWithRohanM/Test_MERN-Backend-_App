const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("dotenv").config();

const URI = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.gnsytgi.mongodb.net/Test_MERN_App?retryWrites=true&w=majority`;

mongoose.connect(URI)
.then(()=>{
    console.log("Database Connected Successfully..");
})
.catch((err)=>{
    console.log(err);
});


