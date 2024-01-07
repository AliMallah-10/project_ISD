const PatientReminder = require("../models/patientReminders");

// Function to create a new patient reminder
exports.createPatientReminder = async (req, res) => {
  try {
    const { patient_id, co_manager_id, message } = req.body;

    const newPatientReminder = new PatientReminder({
      patient_id,
      co_manager_id,
      message,
    });

    await newPatientReminder.save();

    res.status(201).json({ message: "Patient reminder created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get a patient reminder by ID
exports.getPatientReminderById = async (req, res) => {
  try {
    const reminderId = req.params.id;

    const patientReminder = await PatientReminder.findById(reminderId);

    if (!patientReminder) {
      return res.status(404).json({ message: "Patient reminder not found" });
    }

    res.status(200).json({ patientReminder });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message });
  }
};

// Function to update a patient reminder
exports.updatePatientReminder = async (req, res) => {
  try {
    const reminderId = req.params.id;
    const { message } = req.body;

    const patientReminder = await PatientReminder.findByIdAndUpdate(
      reminderId,
      { message },
      { new: true }
    );

    if (!patientReminder) {
      return res.status(404).json({ message: "Patient reminder not found" });
    }

    res.status(200).json({ message: "Patient reminder updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a patient reminder
exports.deletePatientReminder = async (req, res) => {
  try {
    const reminderId = req.params.id;

    const patientReminder = await PatientReminder.findByIdAndDelete(reminderId);

    if (!patientReminder) {
      return res.status(404).json({ message: "Patient reminder not found" });
    }

    res.status(200).json({ message: "Patient reminder deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get patient reminders for a specific user
exports.getPatientRemindersByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const patientReminders = await PatientReminder.find({ patient_id: userId });

    res.status(200).json({ patientReminders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get all patient reminders
exports.getAllPatientReminders = async (req, res) => {
  try {
    const patientReminders = await PatientReminder.find();

    res.status(200).json({ patientReminders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
