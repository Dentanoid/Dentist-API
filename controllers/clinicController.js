const { v4: uuidv4 } = require('uuid');
const { mqttTimeout, responseMap, client } = require("./utils")
const { json } = require('express');

/* GET timeslots with matching dentist ID.*/
async function getDentistTimeslots(req, res, next) {
    /*
    if (!client.connected) { return res.status(502).json({ error: "MQTT client not connected" }) }

    const uuid = uuidv4();
    try {
        const dentistID = req.params.dentistID;
        const publishTopic = "grp20/req/timeSlots/get/";

        responseMap.set(uuid, res);
        client.publish(publishTopic, JSON.stringify({
            dentistID: dentistID,
            requestID: uuid
        }), (err) => { if (err) { next(err) } });
        mqttTimeout(uuid, 10000);
    }
    catch (err) {
        responseMap.delete(uuid);
        next(err);
    }
    */
}

/*
// TODO: Ask the API guys about the error and then migrate the method from appointmentController.js to this file
async function registerClinic(req, res, next) {
    if (!client.connected) { return res.status(502).json({ error: "MQTT client not connected" }) }
    console.log("clinicController.js --> registerClinic() GG")

    const uuid = uuidv4();
    try {
        const clinic_name = req.body.clinic_name;
        const clinic_id = req.body.clinic_id;
        const location = req.body.location;
        const employees = req.body.employees;

        const publishTopic = "sub/dental/clinic/register"
        const publishMessage = JSON.stringify({
            clinic_name: clinic_name,
            clinic_id: clinic_id,
            location: location,
            employees: employees
        })

        console.log("********************************")
        console.log("clinicController.js --> registerClinic()")
        console.log(publishMessage)
        console.log("********************************")

        responseMap.set(uuid, res);
        client.publish(publishTopic, publishMessage, (err) => { if (err) { next(err) } });
        // mqttTimeout(uuid, 10000)
        res.status(201).json(publishMessage) // TODO: Wait for response using Parallel Programming
    }
    catch (err) {
        responseMap.delete(uuid);
        next(err)
    }
}
*/

module.exports = {
    getDentistTimeslots
};
