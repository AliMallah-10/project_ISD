const mongoose = require("mongoose");

const doctorRegistrationRequestSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Doctor ID is required
  },
  request_status: {
    type: String,
    required: true, // Request status is required
    enum: ["pending", "approved", "rejected"], // Allowed values
  },
  timestamp: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
    required: true, // Timestamp is required
  },
  specialization: {
    type: String, // Assuming specialization is a string property
    required: true, // Specialization is required
    validate: {
      validator: function (value) {
        // Define your custom validation logic here
        const minLength = 50; // Set your desired minimum length
        return value.length >= minLength;
      },
      message:
        "Definition of Specialization must be at least 50 characters long",
    },
  },
  experience: {
    type: String, // Assuming experience is a string property
    required: true, // Experience is required
    validate: {
      validator: function (value) {
        // Define your custom validation logic here
        const minLength = 50; // Set your desired minimum length
        return value.length >= minLength;
      },
      message: "Definition about His/Her Experience must be at least 50 characters long",
    },
  },

  // Additional registration request details
});

const DoctorRegistrationRequest = mongoose.model(
  "DoctorRegistrationRequest",
  doctorRegistrationRequestSchema
);

module.exports = DoctorRegistrationRequest;
