const {  client } = require('./utils');

async function login(req, res, next) {

    try {
        /*
        // REFACTORED VERSION (Will be used once the group has agreed on the exact payload-attributes)
        const timeslotID = req.body.timeslotID;
        const patientID = req.body.patientID;
        */
        const publishTopic = "grp20/req/dentist/read"
        const username = req.body.username;
        const password = req.body.password;

        client.publish(publishTopic, JSON.stringify({
            username,
            password,
        }), (err) => { if (err) { next(err) } });

        // res.status(201).json('temp')
    }
    catch (err) {
        console.error(err)
        next(err)
    }
}


async function register(req, res, next) {

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

        client.publish(publishTopic, JSON.stringify({
            username,
            password,
            clinic,
        }), (err) => { if (err) { next(err) } });

    }
    catch (err) {
        next(err)
    }
}



module.exports = {
    login,
    register
}