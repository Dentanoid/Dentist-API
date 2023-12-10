const express = require('express');
const router = express.Router();
const { getUsersAppointments, createAvailableTime, deleteAvailableTime } = require('../controllers/availableTimeController');

/* GET appointments with matching patientID. */
router.get('/users/:patientID', getUsersAppointments);

/* POST appointment using a patientID and appointmentID*/
router.post('/', createAvailableTime);

/* DELETE appointment using a appointmentID*/
// router.delete('/:appointmentID', cancelAppointment); // <--- Refactored version
router.delete('/:id', deleteAvailableTime);

module.exports = router;
