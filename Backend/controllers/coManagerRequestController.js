const CoManagerRequest = require("../models/coManagerRequests");

// Function to create a new co-manager request
exports.createCoManagerRequest = async (req, res) => {
  try {
    const { co_manager_id, request_type, request_details } = req.body;
    // Define an array of allowed request types
    const allowedRequestTypes = [
      "Add New Co-Manager",
      "Change Co-Manager Permissions",
      "Remove Co-Manager",
      "Add New Doctor",
      "Remove Doctor",
      "Change Doctor Permissions",
      "Change In Schedules",
    ];

    // Check if the provided request_type is valid
    if (!allowedRequestTypes.includes(request_type)) {
      return res.status(400).json({ message: "Invalid request type" });
    }

    const newCoManagerRequest = new CoManagerRequest({
      co_manager_id,
      request_type,
      request_details,
    });

    await newCoManagerRequest.save();

    res
      .status(201)
      .json({ message: "Co-manager request created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get a co-manager request by ID
exports.getCoManagerRequestById = async (req, res) => {
  try {
    const requestId = req.params.id;

    const coManagerRequest = await CoManagerRequest.findById(requestId);

    if (!coManagerRequest) {
      return res.status(404).json({ message: "Co-manager request not found" });
    }

    res.status(200).json({ coManagerRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to update a co-manager request (approve or reject)
exports.updateCoManagerRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { status } = req.body;

    const coManagerRequest = await CoManagerRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!coManagerRequest) {
      return res.status(404).json({ message: "Co-manager request not found" });
    }

    res
      .status(200)
      .json({ message: "Co-manager request updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to delete a co-manager request
exports.deleteCoManagerRequest = async (req, res) => {
  try {
    const requestId = req.params.id;

    const coManagerRequest = await CoManagerRequest.findByIdAndDelete(
      requestId
    );

    if (!coManagerRequest) {
      return res.status(404).json({ message: "Co-manager request not found" });
    }

    res
      .status(200)
      .json({ message: "Co-manager request deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get co-manager requests for a specific user
exports.getCoManagerRequestsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const coManagerRequests = await CoManagerRequest.find({
      co_manager_id: userId,
    });

    res.status(200).json({ coManagerRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get all co-manager requests
exports.getAllCoManagerRequests = async (req, res) => {
  try {
    const coManagerRequests = await CoManagerRequest.find();

    res.status(200).json({ coManagerRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
