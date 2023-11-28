const express = require('express');
const router = express.Router();
const { createAppointment, cancelAppointment, registerClinicTemp, addDentistTemp, removeDentistTemp } = require('../controllers/appointmentController');

/* POST appointment using a patientID and appointmentID*/
router.post('/availabletimes', createAppointment);

/* DELETE appointment using a appointmentID*/
router.post('/appointments', cancelAppointment);

router.post('/clinics', registerClinicTemp);

router.post('/clinics/add', addDentistTemp);

router.post('/clinics/remove', removeDentistTemp);

module.exports = router;
