const { v4: uuidv4 } = require('uuid');
const { mqttTimeout, responseMap, client } = require("./utils")

// Create DB-instance in AppointmentService 'AvailableTime'
async function createAppointment(req, res, next) {
    if (!client.connected) { return res.status(502).json({ error: "MQTT client not connected" }) }

    const uuid = uuidv4();
    try {
        const clinic_id = req.body.clinic_id;
        const dentist_id = req.body.dentist_id;
        const start_time = req.body.start_time;
        const end_time = req.body.end_time;

        const publishTopic = "grp20/req/availabletimes/post"
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
        res.status(201).json(publishMessage)

        /*
        TODO 1: This API needs to use MQTT to publish message to microservices:
        responseMap.set(uuid, res);
        client.publish(publishTopic, publishMessage, (err) => { if (err) { next(err) } });
        mqttTimeout(uuid, 10000)

        TODO 2: Microservices publishes response back to API
        */
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
        const patient_id = req.body.patient_id;

        const publishTopic = "grp20/req/appointments/delete/"
        
        responseMap.set(uuid, res);
        client.publish(publishTopic, JSON.stringify({
            clinic_id: clinic_id,
            dentist_id: dentist_id,
            start_time: start_time,
            end_time: end_time,
            patient_id: patient_id
        }), (err) => { if (err) { next(err) } });
        mqttTimeout(uuid, 10000)
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
