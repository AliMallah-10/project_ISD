const express = require('express');
const router = express.Router();

// Import the doctor registration requests controller
const doctorRegistrationRequestsController = require('../controllers/doctorRegistrationRequestController');

// Define routes for doctor registration requests
router.get('/', doctorRegistrationRequestsController.getAllDoctorRegistrationRequests);
router.get('/RegistrationRequest/:id', doctorRegistrationRequestsController.getDoctorRegistrationRequestById);
router.post('/createDoctor', doctorRegistrationRequestsController.createDoctorRegistrationRequest);
router.put('/updateDoctor/:id', doctorRegistrationRequestsController.updateDoctorRegistrationRequest);
router.delete('/deleteDoctor/:id', doctorRegistrationRequestsController.deleteDoctorRegistrationRequest);

module.exports = router;
