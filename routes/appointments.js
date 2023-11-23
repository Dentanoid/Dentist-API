const express = require('express');
const router = express.Router();
const { createAppointment, cancelAppointment } = require('../controllers/appointmentController');

/* POST appointment using a patientID and appointmentID*/
router.post('/', createAppointment);

/* DELETE appointment using a appointmentID*/
router.post('/:appointmentID', cancelAppointment);

module.exports = router;
