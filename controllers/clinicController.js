const {client} = require("./utils")

async function registerClinic(req, res, next) {

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

        client.publish(publishTopic, publishMessage, (err) => { if (err) { next(err) } });
        // mqttTimeout(uuid, 10000)
    }
    catch (err) {
        next(err)
    }
}

async function addDentist(req, res, next) {
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

        client.publish(publishTopic, publishMessage, (err) => { if (err) { next(err) } });
    }
    catch (err) {
        next(err)
    }
}

async function removeDentist(req, res, next) {

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

        client.publish(publishTopic, publishMessage, (err) => { if (err) { next(err) } });
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    registerClinic,
    addDentist,
    removeDentist
};
