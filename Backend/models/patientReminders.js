const mongoose = require("mongoose");

const patientReminderSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Patient ID is required
  },
  co_manager_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Co-manager ID is required
  },
  message: {
    type: String,
    required: true, // Message is required
    minlength: 5, // Minimum length for the message
    maxlength: 500, // Maximum length for the message
  },
  timestamp: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
    required: true, // Timestamp is required
  },
  // Additional reminder details
});

const PatientReminder = mongoose.model(
  "PatientReminder",
  patientReminderSchema
);

module.exports = PatientReminder;
