const express = require("express");

const userData = require("../Models/userDataSchema");

const router = express.Router();


router.post("/playerData", async (req, res) => {
    try {
        const insertData = new userData(req.body);
        const getData = await insertData.save();
        res.status(201).send(getData);
    } catch (err) {
        res.status(404).send(err);
    }

});

router.get("/playerData", async (req, res) => {
    try {
        const getData = await userData.find();
        res.status(201).send(getData);

    } catch (err) {
        res.status(404).send(err);
    }
})

router.get("/playerData/:firstName", async (req, res) => {
    try {
        const getFirstName = req.params.firstName;
        const getData = await userData.findOne({ firstName: getFirstName });
        res.status(201).send(getData);

    } catch (err) {
        res.status(404).send(err);
    }
});



router.patch("/playerData/:firstName", async (req, res) => {
    try {
        const getFirstName = req.params.firstName;
        const getData = await userData.findOneAndUpdate({ firstName: getFirstName }, req.body, {
            new: true,
        });
        res.status(201).send(getData);

    } catch (err) {
        req.status(404).send(err);
    }

})


router.patch("/playerData/:id", async (req, res) => {
    try {
        const getId = req.params.id;

        const getData = await userData.findByIdAndUpdate(getId, req.body, {
            new: true,
        })
        res.status(201).send(getData);
    } catch (err) {
        res.status(404).send(err);
    }

});





router.patch("/playerData/:firstName/:updateLastName", async (req, res) => {
    try {
        const getFirstName = req.params.firstName;
        const updateLastName = req.params.updateLastName;

        const getValidation = await userData.updateOne({ firstName: getFirstName }, { $set: { lastName: updateLastName } });

        if (getValidation.acknowledged === true) {
            const getData = await userData.findOne({ firstName: getFirstName });
            res.status(201).send(getData);
        }
        else {
            res.status(404).send("Could Not Update The Requested Data, Kindly Try Again....");
        }
    } catch (err) {
        res.status(404).send(err);
    }

});


router.delete("/playerData/:id", async (req, res) => {
    try {
        const getId = req.params.id;
        const getData = await userData.findByIdAndDelete(getId);
        res.status(201).send(getData);
    } catch (err) {
        res.status(404).send(err);
    }

});







module.exports = router;