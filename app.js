const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const authenticate = require("./Authentication/authenticateUser");

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

app.set("view engine", "hbs");
hbs.registerPartials("/Users/rohanmote/Test_MERN_Project/MERN_Project/Partials");






app.get("/", (req, res) => {
    res.render("indexFile");

});

app.get("/errorPage", (req, res) => {
    res.render("ErrorPage");
});

app.get("/passwordError", (req, res) => {
    res.render("PasswordErrorPage");
});

app.get("/secretPage", authenticate, (req, res) => {
    res.render("SecretPage");
});

app.get("/lostPage", (req, res) => {
    res.render("LostPage");
})

app.get("/signOut", authenticate, async (req, res) => {
    try {
        const getData = req.getData;
        const getCurrentToken = req.getCurrentToken;

        getData.tokenVal = getData.tokenVal.filter((curVal, index) => {
            return getCurrentToken !== curVal.firstToken;
        });

        await getData.save();

        res.clearCookie("logInCookie");
        res.render("indexFile");
    } catch (err) {
        res.render("ErrorPage");
    }
})


app.post("/register", async (req, res) => {
    try {
        const getPassword = req.body.password;
        const getConfirmPassword = req.body.confirmPassword;
        const getEmail = req.body.email;

        const checkUser = await userData.findOne({ email: getEmail });

        //Checking if a User with the provided email already exists...
        if (checkUser) {
            res.render("AlreadyExistsUser");
        }
        else {

            const { firstName, lastName, email, password, confirmPassword, mobile } = req.body; //OBJECT Destructuring (Its just a way to write the statements simply whithout writing them individually and repetadely

            if (getPassword === getConfirmPassword) {
                const insertData = new userData({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                    mobile: mobile,
                });

                const registrationToken = await insertData.createRegistrationToken();
                console.log("Registration Token = " + registrationToken);


                res.cookie("registartionCookie", registrationToken);



                const getData = await insertData.save();
                const getFullName = getData.firstName + " " + getData.lastName;

                res.render("indexFile", {
                    profileName: getFullName,
                });
            }
            else {
                res.render("PasswordErrorPage")
            }
        }


    } catch (err) {
        console.log(err);
        res.render("ErrorPage");
    }

});


app.post("/logIn", async (req, res) => {
    try {
        const getEmail = req.body.email;
        const getPassword = req.body.password;

        const getData = await userData.findOne({ email: getEmail });
        const validateUser = await bcrypt.compare(getPassword, getData.password);


        if (validateUser) {
            const getFullName = await getData.firstName.concat(" " + getData.lastName);

            const logInToken = await getData.createLogInToken();
            console.log("LogIn Token = " + logInToken);


            res.cookie("logInCookie", logInToken);

            res.render("indexFile", {
                profileName: getFullName,
            });
        }
        else {
            res.render("ErrorPage");
        }

    } catch (err) {
        res.render("LostPage");
    }
});




app.listen(process.env.PORT, "127.0.0.1", () => {
    console.log("Server Connected Successfully!!");
})