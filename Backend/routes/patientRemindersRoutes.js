const express = require("express");
const router = express.Router();

// Import the patient reminders controller
const patientRemindersController = require("../controllers/patientReminderController");

// Define routes for patient reminder-related operations
router.get("/", patientRemindersController.getAllPatientReminders);
router.get("/PatientRemindersByUser/:id", patientRemindersController.getPatientRemindersByUserId);
router.get("/PatientReminder/:id", patientRemindersController.getPatientReminderById);
router.post("/createReminderForPatient", patientRemindersController.createPatientReminder);
router.put("/updateReminder/:id", patientRemindersController.updatePatientReminder);
router.delete("/deleteReminder/:id", patientRemindersController.deletePatientReminder);

module.exports = router;
