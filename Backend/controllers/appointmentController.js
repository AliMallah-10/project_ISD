const Appointment = require("../models/appointments");
const User = require("../models/User");

// Function to create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const {
      date,
      patientName,
      patientNumber,
      time,
      services,
      doctorName, // Get the selected doctor's name
    } = req.body;

    // Create the appointment with the doctor's name and ID
    const newAppointment = new Appointment({
      date,
      time,
      patientName,
      patientNumber,
      services,
      doctorName, // Associate the doctor's name
    });

    await newAppointment.save();

    res.status(201).json({ message: "Appointment created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// Function to get appointments by the name of the patient
exports.getAppointmentsByPatientName = async (req, res) => {
  try {
    const patientName = req.params.name;

    const appointments = await Appointment.find({ patientName: patientName });

    if (!appointments || appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this patient" });
    }

    res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// Function to get appointments by the username of the doctor
// Function to get appointments by the username of the doctor
exports.getAppointmentsByDoctorUsername = async (req, res) => {
  try {
    const doctorUsername = req.params.username;

    // Find the user with the given doctor username
    const user = await User.findOne({ username: doctorUsername });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with this doctor username" });
    }

    // Find appointments associated with the user's ID
    const appointments = await Appointment.find({ doctor_id: user._id });

    if (!appointments || appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this doctor username" });
    }

    res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// Function to get appointments by the name of the doctor
exports.getAppointmentsByDoctorName = async (req, res) => {
  try {
    const doctorName = req.params.name;

    const appointments = await Appointment.find({ doctorName: doctorName });

    if (!appointments || appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this doctor" });
    }

    res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to update an appointment
exports.updateAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const {
      doctorName,
      date,
      time,
      status,
      patientName,
      patientNumber,
      services,
    } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { doctorName, date, time, status, patientName, patientNumber, services },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).send("Appointment updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    await appointment.deleteOne();
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get appointments for a specific doctor
exports.getAppointmentsByDoctorId = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const appointments = await Appointment.find({ doctor_id: doctorId });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get appointments for a specific user
exports.getAppointmentsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const appointments = await Appointment.find({ patient_id: userId });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    if (!appointments) {
      return res.status(404).json({ message: "No appointments found" });
    }
    if (res) {
      res.status(200).json(appointments);
    }
  } catch (error) {
    console.error(error);
    if (res) {
      res.status(500).json({ error: error.message });
    }
  }
};
