const mongoose = require("mongoose");

const reviewRatingSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Doctor ID is required
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Patient ID is required
  },
  rating: {
    type: Number,
    required: true, // Rating is required
    min: 1, // Minimum rating value
    max: 5, // Maximum rating value
  },
  review_text: {
    type: String,
    required: true, // Review text is required
    minlength: 5, // Minimum length for review text
    maxlength: 500, // Maximum length for review text
  },
  timestamp: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
    required: true, // Timestamp is required
  },
  // Additional review/rating details
});

const ReviewRating = mongoose.model("ReviewRating", reviewRatingSchema);

module.exports = ReviewRating;
