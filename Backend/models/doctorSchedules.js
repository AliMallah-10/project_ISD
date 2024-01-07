const mongoose = require("mongoose");

const doctorScheduleSchema = new mongoose.Schema({
  // doctor_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true, // Doctor ID is required
  // },

  day: {
    type: [String],
    required: true, // At least one day should be available
    validate: {
      validator: (days) => days.length > 0,
      message: "At least one day should be available",
    },
  },
  nameDoctor: {
    type: String,
    required: true,
  },
  services: {
    type: [String], // An array of service names or IDs
    required: true,
  },
  // date: {
  //   type: Date,
  //   required: true,
  // },
  start_time: {
    type: String,
    required: true, // Start time is required
    // validate: {
    //   validator: (time) => /^([01]\d|2[0-3]):([0-5]\d) (AM|PM)$/.test(time),
    //   message: 'Invalid time format (e.g., "08:00 AM")',
    // },
  },
  end_time: {
    type: String,
    required: true, // End time is required
    // validate: {
    //   validator: (time) => /^([01]\d|2[0-3]):([0-5]\d) (AM|PM)$/.test(time),
    //   message: 'Invalid time format (e.g., "05:00 PM")',
    // },
  },
  status: {
    type: String,
    enum: ["scheduled", "cancelled", "completed"],
    required: true,
  },
  // Additional schedule details
});

const DoctorSchedule = mongoose.model("DoctorSchedule", doctorScheduleSchema);

module.exports = DoctorSchedule;
