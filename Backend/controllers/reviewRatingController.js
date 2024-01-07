const ReviewRating = require("../models/reviewsRatings");

// Function to create a new review and rating
exports.createReviewRating = async (req, res) => {
  try {
    const { doctor_id, patient_id, rating, review_text } = req.body;

    const newReviewRating = new ReviewRating({
      doctor_id,
      patient_id,
      rating,
      review_text,
    });

    await newReviewRating.save();

    res.status(201).json({ message: "Review and rating created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get a review rating by ID
exports.getReviewRatingById = async (req, res) => {
  try {
    const ratingId = req.params.id;

    const reviewRating = await ReviewRating.findById(ratingId);

    if (!reviewRating) {
      return res.status(404).json({ message: "Review rating not found" });
    }

    res.status(200).json({ reviewRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to update a review and rating
exports.updateReviewRating = async (req, res) => {
  try {
    const ratingId = req.params.id;
    const { rating, review_text } = req.body;

    const reviewRating = await ReviewRating.findByIdAndUpdate(
      ratingId,
      { rating, review_text },
      { new: true }
    );

    if (!reviewRating) {
      return res.status(404).json({ message: "Review rating not found" });
    }

    res.status(200).json({ message: "Review rating updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// exports.updateReviewRating = async (req, res) => {
//   try {
//     const ratingId = req.params.id;
//     const { rating, review_text } = req.body;

//     // Find the review rating by its ID
//     const reviewRating = await ReviewRating.findById(ratingId);

//     if (!reviewRating) {
//       return res.status(404).json({ message: "Review rating not found" });
//     }

//     // Update the review rating fields
//     reviewRating.rating = rating;
//     reviewRating.review_text = review_text;

//     // Save the updated review rating
//     const updatedReviewRating = await reviewRating.save();

//     res.status(200).json({ message: "Review rating updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// Function to delete a review and rating
exports.deleteReviewRating = async (req, res) => {
  try {
    const ratingId = req.params.id;

    const reviewRating = await ReviewRating.findByIdAndDelete(ratingId);

    if (!reviewRating) {
      return res.status(404).json({ message: "Review rating not found" });
    }

    res.status(200).json({ message: "Review rating deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllReviewsRatings = async (req, res) => {
  try {
    // Query the database to fetch all review ratings
    const reviewsRatings = await ReviewRating.find();

    // Send the reviews and ratings as a JSON response
    res.json(reviewsRatings);
  } catch (error) {
    // Handle errors, e.g., send an error response
    console.error(error);
    res
      .status(500)
      .json({ error: error.message });
  }
};
