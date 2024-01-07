const DoctorRegistrationRequest = require("../models/doctorRegistrationRequests");

// Function to create a new doctor registration request
exports.createDoctorRegistrationRequest = async (req, res) => {
  try {
    const { doctor_id, request_status, specialization, experience } = req.body;

    const newDoctorRegistrationRequest = new DoctorRegistrationRequest({
      doctor_id,
      request_status,
      specialization,
      experience,
    });

    await newDoctorRegistrationRequest.save();

    res
      .status(201)
      .json({ message: "Doctor registration request created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get a doctor registration request by ID
exports.getDoctorRegistrationRequestById = async (req, res) => {
  try {
    const requestId = req.params.id;

    const doctorRegistrationRequest = await DoctorRegistrationRequest.findById(
      requestId
    );

    if (!doctorRegistrationRequest) {
      return res
        .status(404)
        .json({ message: "Doctor registration request not found" });
    }

    res.status(200).json({ doctorRegistrationRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to update a doctor registration request (approve or reject)
exports.updateDoctorRegistrationRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { request_status } = req.body;

    const doctorRegistrationRequest =
      await DoctorRegistrationRequest.findByIdAndUpdate(
        requestId,
        { request_status },
        { new: true }
      );

    if (!doctorRegistrationRequest) {
      return res
        .status(404)
        .json({ message: "Doctor registration request not found" });
    }

    res
      .status(200)
      .json({ message: "Doctor registration request updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a doctor registration request
exports.deleteDoctorRegistrationRequest = async (req, res) => {
  try {
    const requestId = req.params.id;

    const doctorRegistrationRequest =
      await DoctorRegistrationRequest.findByIdAndDelete(requestId);

    if (!doctorRegistrationRequest) {
      return res
        .status(404)
        .json({ message: "Doctor registration request not found" });
    }

    res
      .status(200)
      .json({ message: "Doctor registration request deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get all doctor registration requests
exports.getAllDoctorRegistrationRequests = async (req, res) => {
  try {
    const doctorRegistrationRequests = await DoctorRegistrationRequest.find();

    res.status(200).json({ doctorRegistrationRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
