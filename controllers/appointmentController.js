const { v4: uuidv4 } = require('uuid');
const { mqttTimeout, responseMap, client } = require("./utils");
const { json } = require('express');

// Create DB-instance in AppointmentService 'AvailableTime'
async function createAppointment(req, res, next) {
    if (!client.connected) { return res.status(502).json({ error: "MQTT client not connected" }) }

    const uuid = uuidv4();
    try {
        const clinic_id = req.body.clinic_id;
        const dentist_id = req.body.dentist_id;
        const start_time = req.body.start_time;
        const end_time = req.body.end_time;

        const publishTopic = "sub/dentist/availabletimes/create"
        const publishMessage = JSON.stringify({
            clinic_id: clinic_id,
            dentist_id: dentist_id,
            start_time: start_time,
            end_time: end_time
        })

        console.log("********************************")
        console.log("appointmentController.js --> createAppointment()")
        console.log(publishMessage)
        console.log("********************************")

        responseMap.set(uuid, res);
        client.publish(publishTopic, publishMessage, (err) => { if (err) { next(err) } });
        // mqttTimeout(uuid, 10000)
        res.status(201).json(publishMessage)
    }
    catch (err) {
        responseMap.delete(uuid);
        next(err)
    }
}

// Delete DB-instance in AppointmentService 'Appointments'
async function cancelAppointment(req, res, next) {
    if (!client.connected) { return res.status(502).json({ error: "MQTT client not connected" }) }

    const uuid = uuidv4();
    try {
        const clinic_id = req.body.clinic_id;
        const dentist_id = req.body.dentist_id;
        const start_time = req.body.start_time;
        const end_time = req.body.end_time;

        const publishTopic = "sub/dentist/delete"
        const publishMessage = JSON.stringify({
            clinic_id: clinic_id,
            dentist_id: dentist_id,
            start_time: start_time,
            end_time: end_time
        })

        console.log("********************************")
        console.log("appointmentController.js --> cancelAppointment()")
        console.log(publishMessage)
        console.log("********************************")
        
        responseMap.set(uuid, res);
        client.publish(publishTopic, publishMessage, (err) => { if (err) { next(err) } });
        res.status(201).json(publishMessage)

        // mqttTimeout(uuid, 10000)
    }
    catch (err) {
        responseMap.delete(uuid);
        next(err)
    }
}

// TODO: Migrate this function to clinicController.js once problem is solved
async function registerClinicTemp(req, res, next) { // NOTE: Will be refactored to the corred file once issue is solved
    if (!client.connected) { return res.status(502).json({ error: "MQTT client not connected" }) }

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

module.exports = {
    createAppointment,
    cancelAppointment,
    registerClinicTemp
};
