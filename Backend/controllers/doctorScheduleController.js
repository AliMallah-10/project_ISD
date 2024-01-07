const DoctorSchedule = require("../models/doctorSchedules");

// Function to create a new doctor's schedule
exports.createDoctorSchedule = async (req, res) => {
  try {
    const { day, services, nameDoctor, start_time, end_time, status } =
      req.body;
    const defaultStatus = status || "scheduled";
    const newDoctorSchedule = new DoctorSchedule({
      day,
      services,
      nameDoctor,
      start_time,
      end_time,
      status: defaultStatus,
    });

    await newDoctorSchedule.save();

    res.status(201).json({ message: "Doctor schedule created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Update a doctor's schedule by ID
exports.updateDoctorSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id; // Get the schedule ID from the request parameters
    const updatedScheduleData = req.body; // Get updated schedule data from the request body

    // Find the schedule by ID and update it
    const updatedSchedule = await DoctorSchedule.findByIdAndUpdate(
      scheduleId,
      updatedScheduleData,
      { new: true } // This option returns the updated schedule
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Doctor schedule not found" });
    }

    res.status(200).json({
      message: "Doctor schedule updated successfully",
      updatedSchedule,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a doctor's schedule by ID
exports.deleteDoctorSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id; // Get the schedule ID from the request parameters

    // Find the schedule by ID and remove it
    const deletedSchedule = await DoctorSchedule.findByIdAndRemove(scheduleId);

    if (!deletedSchedule) {
      return res.status(404).json({ message: "Doctor schedule not found" });
    }

    res.status(200).json({ message: "Doctor schedule deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get schedules for all doctors
exports.getAllDoctorSchedules = async (req, res) => {
  try {
    const doctorSchedules = await DoctorSchedule.find();

    if (!doctorSchedules) {
      // Handle the case when there are no schedules
      return res.status(404).json({ message: "No doctor schedules found" });
    }

    res.status(200).json(doctorSchedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get doctor schedules by the name of the doctor
exports.getDoctorSchedulesByName = async (req, res) => {
  try {
    // Get the doctor's name from the request parameters
    const nameDoctor = req.params.nameDoctor;

    // Search for doctor schedules in the database based on the doctor's name
    const schedules = await DoctorSchedule.find({ nameDoctor });

    // Check if any schedules were found for the doctor
    if (!schedules || schedules.length === 0) {
      return res
        .status(404)
        .json({ message: "No schedules found for this doctor" });
    }

    // Respond with the found schedules in a JSON format
    res.status(200).json(schedules);
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// Get Doctor Schedules by Day
// Function to get doctor schedules by a specific day
exports.getDoctorSchedulesByDay = async (req, res) => {
  try {
    // Get the day from the request parameters
    const day = req.params.day;

    // Search for doctor schedules in the database where the specified day is in the array of available days
    const schedules = await DoctorSchedule.find({ day: day });

    // Check if any schedules were found for the specified day
    if (!schedules || schedules.length === 0) {
      return res.status(404).json({ message: `No schedules found for ${day}` });
    }

    // Respond with the found schedules in a JSON format
    res.status(200).json(schedules);
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
