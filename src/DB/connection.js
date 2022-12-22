const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const URI = "mongodb://localhost:27017/Test_MERN_App";

mongoose.connect(URI)
.then(()=>{
    console.log("Database Connected Successfully..");
})
.catch((err)=>{
    console.log(err);
});


