const express = require("express");
const router = express.Router();

// Import the reviews and ratings controller
const reviewsRatingsController = require("../controllers/reviewRatingController");

// Define routes for reviews and ratings-related operations

router.get("/", reviewsRatingsController.getAllReviewsRatings);

router.get("/ReviewRating/:id", reviewsRatingsController.getReviewRatingById);
router.post("/createRating", reviewsRatingsController.createReviewRating);
router.put("/updateRating/:id", reviewsRatingsController.updateReviewRating);
router.delete("/deleteRating/:id", reviewsRatingsController.deleteReviewRating);

module.exports = router;
