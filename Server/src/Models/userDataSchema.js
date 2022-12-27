const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const documentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        uppercase: true,
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email Ek Barr Phir Se Dekh Le Behen..");
            }
        },
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    tokenVal: [{
        firstToken: {
            type: String,
            required: true,
        }
    }]
});



documentSchema.methods.createRegistrationToken = async function () {
    try {
        const token = await jwt.sign({ id: this._id.toString() }, process.env.SECRET_KEY);

        this.tokenVal = this.tokenVal.concat({ firstToken: token });
        return token;
    } catch (err) {
        console.log(err);
    }

};




documentSchema.methods.createLogInToken = async function () {
    try {
        const token = jwt.sign({ id: this._id.toString() }, process.env.SECRET_KEY);

        this.tokenVal = this.tokenVal.concat({ firstToken: token });
        this.confirmPassword = await bcrypt.hash(this.password, 9);
        this.save();
        return token;
    } catch (err) {
        console.log(err);
    }

}





documentSchema.pre("save", async function (next) {
    // convert password only when password field is changed or modified. We dont want to chnage password every time user saves a document into document.
    try {
        if(this.isModified("password")) 
        {
            this.password = await bcrypt.hash(this.password, 9);
            this.confirmPassword = undefined;
        }
        next();
    } catch (err) {
        console.log(err);
    }
})




const createCollection = new mongoose.model("Test_User_Data", documentSchema);

module.exports = createCollection;