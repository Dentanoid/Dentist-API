const {v4: uuidv4} = require('uuid');
const {responseMap, client} = require("./utils")

async function registerClinic(req, res, next) {
    if (!client.connected) { return res.status(502).json({ error: "MQTT client not connected" }) }

    const uuid = uuidv4();
    try {
        const clinic_name = req.body.clinic_name;
        const clinic_id = req.body.clinic_id;
        const position = req.body.position;
        const employees = req.body.employees;

        const publishTopic = "sub/dental/clinic/register"
        const publishMessage = JSON.stringify({
            clinic_name: clinic_name,
            clinic_id: clinic_id,
            position: position,
            employees: employees
        })

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

async function addDentist(req, res, next) {
    if (!client.connected) { return res.status(502).json({ error: "MQTT client not connected" }) }

    const uuid = uuidv4();
    try {
        const clinic_name = req.body.clinic_name;
        const clinic_id = req.body.clinic_id;
        const employee_name = req.body.employee_name;

        const publishTopic = "sub/dental/clinic/dentist/add"
        const publishMessage = JSON.stringify({
            clinic_name: clinic_name,
            clinic_id: clinic_id,
            employee_name: employee_name
        })

        console.log("********************************")
        console.log('ADD DENTIST')
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

async function removeDentist(req, res, next) {
    if (!client.connected) { return res.status(502).json({ error: "MQTT client not connected" }) }

    const uuid = uuidv4();
    try {
        const clinic_name = req.body.clinic_name;
        const clinic_id = req.body.clinic_id;
        const employee_name = req.body.employee_name;

        const publishTopic = "sub/dental/clinic/dentist/remove"
        const publishMessage = JSON.stringify({
            clinic_name: clinic_name,
            clinic_id: clinic_id,
            employee_name: employee_name
        })

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

module.exports = {
    registerClinic,
    addDentist,
    removeDentist
};
