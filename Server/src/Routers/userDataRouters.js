const express = require("express");
const bcrypt = require("bcrypt");
const userData = require("../Models/userDataSchema");

const router = express.Router();


router.get("/", async (req, res) => {
    try{
        res.status(200).json("indexFile");

    }catch(err){
        console.log(err);
    }

});



router.post("/register", async (req, res) => {
    try {

        const getPassword = req.body.password;
        const getConfirmPassword = req.body.confirmPassword;
        const getEmail = req.body.email;

        const checkUser = await userData.findOne({ email: getEmail });

        //Checking if a User with the provided email already exists...
        if (checkUser) {
            console.log("AlreadyExistsUser");
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


                res.cookie("registrationCookie", registrationToken);



                const getData = await insertData.save();
                const getFullName = getData.firstName + " " + getData.lastName;

                console.log("Registered Successfully..");

                res.status(201).json("Registered Successfully!!");


                // res.status(201).render("indexFile", {
                //     profileName: getFullName,
                // });
            }
            else {
                console.log("Something Went Wrong!!");

                // res.status(404).render("PasswordErrorPage")
            }
        }


    } catch (err) {
        res.status(404).json(err);
    }

});



router.post("/logIn", async (req, res) => {
    try {
        const getEmail = req.body.email;
        const getPassword = req.body.password;

        console.log("Emailllllll = "+getEmail);

        const getData = await userData.findOne({ email: getEmail });

        console.log(getData);

        const validateUser = await bcrypt.compare(getPassword, getData.password);

        console.log(validateUser);


        if (validateUser) {
            const getFullName = await getData.firstName.concat(" " + getData.lastName);

            const logInToken = await getData.createLogInToken();
            console.log("LogIn Token = " + logInToken);



            res.cookie("logInCookiee", logInToken);

            res.status(201).json("Logged Inn!!");

            


            // res.render("indexFile", {
            //     profileName: getFullName,
            // });
        }
        else {
            res.status(404).json("Wrong Data");
            // res.render("logInPage");
        }

    } catch (err) {
        console.log(err);
        // res.render("LostPage");
    }
});





// router.post("/playerData", async (req, res) => {
//     try {
//         const insertData = new userData(req.body);
//         const getData = await insertData.save();
//         res.status(201).json(getData);
//     } catch (err) {
//         res.status(404).json(err);
//     }

// });

// router.get("/playerData", async (req, res) => {
//     try {
//         const getData = await userData.find();
//         res.status(201).send(getData);

//     } catch (err) {
//         res.status(404).send(err);
//     }
// })

// router.get("/playerData/:firstName", async (req, res) => {
//     try {
//         const getFirstName = req.params.firstName;
//         const getData = await userData.findOne({ firstName: getFirstName });
//         res.status(201).send(getData);

//     } catch (err) {
//         res.status(404).send(err);
//     }
// });



// router.patch("/playerData/:firstName", async (req, res) => {
//     try {
//         const getFirstName = req.params.firstName;
//         const getData = await userData.findOneAndUpdate({ firstName: getFirstName }, req.body, {
//             new: true,
//         });
//         res.status(201).send(getData);

//     } catch (err) {
//         req.status(404).send(err);
//     }

// })


// router.patch("/playerData/:id", async (req, res) => {
//     try {
//         const getId = req.params.id;

//         const getData = await userData.findByIdAndUpdate(getId, req.body, {
//             new: true,
//         })
//         res.status(201).send(getData);
//     } catch (err) {
//         res.status(404).send(err);
//     }

// });





// router.patch("/playerData/:firstName/:updateLastName", async (req, res) => {
//     try {
//         const getFirstName = req.params.firstName;
//         const updateLastName = req.params.updateLastName;

//         const getValidation = await userData.updateOne({ firstName: getFirstName }, { $set: { lastName: updateLastName } });

//         if (getValidation.acknowledged === true) {
//             const getData = await userData.findOne({ firstName: getFirstName });
//             res.status(201).send(getData);
//         }
//         else {
//             res.status(404).send("Could Not Update The Requested Data, Kindly Try Again....");
//         }
//     } catch (err) {
//         res.status(404).send(err);
//     }

// });


// router.delete("/playerData/:id", async (req, res) => {
//     try {
//         const getId = req.params.id;
//         const getData = await userData.findByIdAndDelete(getId);
//         res.status(201).send(getData);
//     } catch (err) {
//         res.status(404).send(err);
//     }

// });







module.exports = router;