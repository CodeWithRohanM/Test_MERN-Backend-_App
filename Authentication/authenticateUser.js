const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const userData = require("../src/Models/userDataSchema");

const authenticateUser = async (req, res, next) => {
    try{

        const currentToken = req.cookies.logInCookie;
        console.log("Current LogInCookie = " + currentToken);
    
        const validateUser = await jwt.verify(currentToken, process.env.SECRET_KEY);
        console.log(validateUser);

        req.getData = await userData.findOne({_id: validateUser.id});
        req.getCurrentToken = currentToken;
    
        next();

    }catch(err){
        res.render("LostPage");
    }

};


module.exports = authenticateUser;