const { v4: uuidv4 } = require('uuid');
const { responseMap, client, mqttTimeout } = require('./utils');

async function login(req, res, next) {

    const uuid = '1' || uuidv4();
    try {
        /*
        // REFACTORED VERSION (Will be used once the group has agreed on the exact payload-attributes)
        const timeslotID = req.body.timeslotID;
        const patientID = req.body.patientID;
        */
        const publishTopic = "grp20/req/dentist/read"
        const username = req.body.username;
        const password = req.body.password;

        responseMap.set(uuid, res);
        client.publish(publishTopic, JSON.stringify({
            username,
            password,
        }), (err) => { if (err) { next(err) } });

        mqttTimeout(uuid, 10000)
        // res.status(201).json('temp')
    }
    catch (err) {
        console.error(err)
        responseMap.delete(uuid);
        next(err)
    }
}


async function register(req, res, next) {

    const uuid = "1" || uuidv4();
    try {
        /*
        // REFACTORED VERSION (Will be used once the group has agreed on the exact payload-attributes)
        const timeslotID = req.body.timeslotID;
        const patientID = req.body.patientID;
        */
        const publishTopic = "grp20/req/dentist/create"

        const username = req.body.username;
        const password = req.body.password;
        const clinic = req.body.clinic;

        responseMap.set(uuid, res);
        client.publish(publishTopic, JSON.stringify({
            username,
            password,
            clinic,
        }), (err) => { if (err) { next(err) } });

        mqttTimeout(uuid, 10000)
        // res.status(201).json('temp')
    }
    catch (err) {
        responseMap.delete(uuid);
        next(err)
    }
}



module.exports = {
    login,
    register
}