const { v4: uuidv4 } = require('uuid');
const { mqttTimeout, responseMap, client } = require("./utils")


/* GET appointments/users/:patientID' 
gets appointments with matching patientID. */
async function getUsersAppointments(req, res, next) {
    if (!client.connected) { return res.status(502).json({ error: "MQTT client not connected" }) }

    const uuid = uuidv4();
    try {
        const patientID = req.params.patientID;
        const publishTopic = "grp20/req/appointments/get";

        responseMap.set(uuid, res);
        client.publish(publishTopic, JSON.stringify({
            patientID: patientID,
            requestID: uuid
        }), (err) => { if (err) { next(err) } });
        mqttTimeout(uuid, 10000)
    }
    catch (err) {
        responseMap.delete(uuid);
        next(err);
    }
}
/* POST appointments/ 
Create appointment using a patientID and timeslotID*/
async function createAppointment(req, res, next) {
    if (!client.connected) { return res.status(502).json({ error: "MQTT client not connected" }) }
    console.log('create appointment')

    const uuid = uuidv4();
    try {
        /*
        // REFACTORED VERSION (Will be used once the group has agreed on the exact payload-attributes)
        const timeslotID = req.body.timeslotID;
        const patientID = req.body.patientID;
        */
        const publishTopic = "sub/dentist/availabletimes/create"     

        const clinic_id = req.body.clinic_id;
        const dentist_id = req.body.dentist_id;
        const start_time = req.body.start_time;
        const end_time = req.body.end_time;

        responseMap.set(uuid, res);
        client.publish(publishTopic, JSON.stringify({
            clinic_id: clinic_id,
            dentist_id: dentist_id,
            start_time: start_time,
            end_time: end_time

        }), (err) => { if (err) { next(err) } });
        // mqttTimeout(uuid, 10000)
        res.status(201).json('temp')
    }
    catch (err) {
        responseMap.delete(uuid);
        next(err)
    }
}
/* DELETE appointments/:appointmentID 
DELETE appointment using an appointmentID*/
async function cancelAppointment(req, res, next) {
    if (!client.connected) { return res.status(502).json({ error: "MQTT client not connected" }) }

    const uuid = uuidv4();
    try {
        /*
        // REFACTORED VERSION (Will be used once the group has agreed on the exact payload-attributes)
        const appointmentID = req.params.appointmentID;
        console.log(appointmentID)
        */

        const publishTopic = "sub/dentist/delete"

        // TEMP VERSION
        const clinic_id = req.body.clinic_id;
        const dentist_id = req.body.dentist_id;
        const start_time = req.body.start_time;
        const end_time = req.body.end_time;
        
        responseMap.set(uuid, res);
        client.publish(publishTopic, JSON.stringify({
            clinic_id: clinic_id,
            dentist_id: dentist_id,
            start_time: start_time,
            end_time: end_time

        }), (err) => { if (err) { next(err) } });
        // mqttTimeout(uuid, 10000)
        res.status(200).json('temp')
    }
    catch (err) {
        responseMap.delete(uuid);
        next(err)
    }
}
module.exports = {
    getUsersAppointments,
    createAppointment,
    cancelAppointment
};
