const express = require('express');
const router = express.Router();
const { registerClinic, addDentist, removeDentist } = require('../controllers/clinicController');

router.post('/', registerClinic);
router.post('/dentists', addDentist);

// router.remove('/dentists/:dentistID', removeDentist); // <--- REFACTORED Version
router.post('/removeTEMP', removeDentist); // <--- TEMP Version

module.exports = router;