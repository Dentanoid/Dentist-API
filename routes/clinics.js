const { registerClinic, addDentist, removeDentist, getClinics } = require('../controllers/clinicController');
const express = require('express');
const router = express.Router();

router.get('/', getClinics)
router.post('/', registerClinic);
router.post('/dentists', addDentist);

// router.remove('/dentists/:dentistID', removeDentist); // <--- REFACTORED Version
// router.post('/removeTEMP', removeDentist); // <--- TEMP Version

module.exports = router;