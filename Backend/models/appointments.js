const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorName: {
    type: String,

    required: true, // Doctor is required for the appointment
  },
  services: {
    type: String, // Use string to store the patient's name
    required: true,
  },
  patientNumber: {
    type: String, // You can use a string or another suitable data type for the appointment number
    required: true,
    unique: true, // Ensure that each appointment number is unique
  },
  patientName: {
    type: String, // Use string to store the patient's name
    required: true,
  },
  date: {
    type: Date,
    required: [true, "Appointment datetime is required"],
    validate: {
      validator: function (value) {
        // Custom date validation, e.g., ensure the datetime is in the future
        return value > new Date();
      },
      message: "Appointment datetime must be in the future",
    },
  },
  time: {
    type: String, // You can use a string to store the time (e.g., "HH:MM AM/PM")
    required: [true, "Appointment time is required"],
  },
  // Reference to User schema based on username

  // status: {
  //   type: String,
  //   required: [true, "Appointment status is required"],
  //   enum: {
  //     values: ["scheduled", "confirmed", "completed", "canceled"],
  //     message: "Invalid appointment status",
  //   },
  // },
  // Additional appointment details
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
