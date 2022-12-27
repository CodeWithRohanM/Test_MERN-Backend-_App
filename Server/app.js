const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const authenticate = require("./Authentication/authenticateUser");




var cors = require('cors')

app.use(cors())





const hbs = require("hbs");

require("dotenv").config({ path: "/Users/rohanmote/Test_MERN_Project/MERN_Project/.env" });
require("./src/DB/connection");
const userData = require("./src/Models/userDataSchema");
const userRouter = require("./src/Routers/userDataRouters");

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use(userRouter);

// app.use(express.static("/Users/rohanmote/Test_MERN_Project/MERN_Project/public"));

// app.set("view engine", "hbs");
// app.set("views", "/Users/rohanmote/Test_MERN_Project/MERN_Project/Server/views");
// hbs.registerPartials("/Users/rohanmote/Test_MERN_Project/MERN_Project/Server/Partials");




// app.get("/errorPage", (req, res) => {
//     res.render("ErrorPage");
// });

// app.get("/passwordError", (req, res) => {
//     res.render("PasswordErrorPage");
// });

// app.get("/secretPage", authenticate, (req, res) => {
//     res.render("SecretPage");
// });

// app.get("/lostPage", (req, res) => {
//     res.render("LostPage");
// })










// app.get("/signOut", authenticate, async (req, res) => {
//     try {
//         const getData = req.getData;
//         const getCurrentToken = req.getCurrentToken;

//         getData.tokenVal = getData.tokenVal.filter((curVal, index) => {
//             return getCurrentToken !== curVal.firstToken;
//         });

//         await getData.save();

//         res.clearCookie("logInCookie");
//         res.render("indexFile");
//     } catch (err) {
//         res.render("ErrorPage");
//     }
// })










app.listen(process.env.PORT, "127.0.0.1", () => {
    console.log("Server Connected Successfully!!");
})