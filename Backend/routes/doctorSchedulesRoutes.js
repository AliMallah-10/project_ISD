const express = require("express");
const router = express.Router();

// Import the doctor schedules controller
const doctorSchedulesController = require("../controllers/doctorScheduleController");

// Define routes for doctor schedule-related operations
router.get("/", doctorSchedulesController.getAllDoctorSchedules);
router.get(
  "/doctorName/:nameDoctor",
  doctorSchedulesController.getDoctorSchedulesByName
);
router.get("/day/:day", doctorSchedulesController.getDoctorSchedulesByDay);
router.post("/createDoctor", doctorSchedulesController.createDoctorSchedule);
router.put("/updateDoctor/:id", doctorSchedulesController.updateDoctorSchedule);
router.delete(
  "/deleteDoctor/:id",
  doctorSchedulesController.deleteDoctorSchedule
);

module.exports = router;
