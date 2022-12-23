const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const userData = require("../src/Models/userDataSchema");

const authenticateUser = async (req, res, next) => {
    try {

        const getCurrentRegistrationToken = req.cookies.registrationCookie;
        const getCurrentLogInToken = req.cookies.logInCookie;
        console.log("First = " + getCurrentRegistrationToken);

        if (getCurrentRegistrationToken) {

                console.log("Second = " + getCurrentLogInToken);

                if(getCurrentLogInToken)
                {
                    const validateUserLogIn = jwt.verify(getCurrentLogInToken, process.env.SECRET_KEY);

                    console.log("SecondSS = " + validateUserLogIn);
    
                    if (!validateUserLogIn) {
                        console.log("Login Not Found..");
                        res.render("LogInPage");
                    }

                }else
                {
                    res.render("logInPage");
                }

            }
        else {
            res.render("RegistrationPage");
        }






        const validateUser = jwt.verify(getCurrentLogInToken, process.env.SECRET_KEY);

        req.getData = await userData.findOne({ _id: validateUser.id });
        req.getCurrentToken = getCurrentLogInToken;
        next();

    } catch (err) {
        console.log(err);
        res.render("LostPage");
    }

};


module.exports = authenticateUser;