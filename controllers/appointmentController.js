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

module.exports = {
    createAppointment,
    cancelAppointment
};
