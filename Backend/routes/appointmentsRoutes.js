const express = require("express");
const router = express.Router();

// Import the appointments controller
const appointmentsController = require("../controllers/appointmentController");

// Define routes for appointment-related operations
router.get("/ByDoctor/:id", appointmentsController.getAppointmentsByDoctorId);
router.get("/UserId/:id", appointmentsController.getAppointmentsByUserId);
router.get("/ByPatientName/:name", appointmentsController.getAppointmentsByPatientName); 
router.get("/ByDoctorName/:name", appointmentsController.getAppointmentsByDoctorName);
router.get("/", appointmentsController.getAllAppointments);
router.get("/appointmentId/:id", appointmentsController.getAppointmentById);
router.post("/createA", appointmentsController.createAppointment);
router.put("/updateA/:id", appointmentsController.updateAppointment);
router.delete("/deleteA/:id", appointmentsController.deleteAppointment);
// Route to get appointments by doctor username
router.get('/doctor/username/:username', appointmentsController.getAppointmentsByDoctorUsername);

module.exports = router;
