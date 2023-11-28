const express = require('express');
const router = express.Router();
const { createAppointment, cancelAppointment, registerClinicTemp } = require('../controllers/appointmentController');

/* POST appointment using a patientID and appointmentID*/
router.post('/availabletimes', createAppointment);

/* DELETE appointment using a appointmentID*/
router.post('/appointments', cancelAppointment);

router.post('/clinics', registerClinicTemp);

module.exports = router;
