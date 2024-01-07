const mongoose = require("mongoose");

const coManagerRequestSchema = new mongoose.Schema({
  co_manager_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Co-manager ID is required
  },
  request_type: {
    type: String,
    required: true, // Request type is required
  },
  request_details: {
    type: Object,
    required: true, // Request details are required
    validate: [
      {
        validator: function (value) {
          // Check if the object has at least 2 properties
          const minProperties = 30;
          return Object.keys(value).length >= minProperties;
        },
        message: "Request details must contain at least 2 properties",
      },
      
    ],
  
  },
  status: {
    type: String,
    // required: true,
    enum: ["pending", "approved", "rejected"], // Allowed values
  },
  timestamp: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
    required: true, // Timestamp is required
  },
  // Additional request details
});

const CoManagerRequest = mongoose.model(
  "CoManagerRequest",
  coManagerRequestSchema
);

module.exports = CoManagerRequest;
