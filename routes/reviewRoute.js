const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel.js");

// @desc    fetch all reviews
// @route   GET v1/reviews
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({});
  res.json(reviews);
});

// @desc    post a review
// @route   Post v1/review
// @access  Public
const postReview = asyncHandler(async (req, res) => {
  const { name, domain, feedback, rating } = req.body;
  console.log(req.body);

  const review = new Review({
    name: name,
    domain: domain,
    feedback: feedback,
    rating: rating,
  });
  const createdReview = await review.save();
  res.status(201).json({ success: true });
});

// @desc    delete a review
// @route   Delete v1/review/:id
// @access  Public
const deleteReview = asyncHandler(async (req, res) => {
  try {
    const deleteReview = await Review.findByIdAndDelete(req.params.id);
    if (!deleteReview) {
      return res
        .status(400)
        .json({ success: false, message: "Review not found" });
    }

    return res.json({
      success: true,
      message: "Review deleted successfully!",
    });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({
      message: error.message,
      success: false,
      error: "Internal server error",
    });
  }
});

// @desc    update a review
// @route   Update v1/review/:id
// @access  Public
const updateReview = asyncHandler(async (req, res) => {
  //check allowed params
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "domain", "feedback", "rating"];
  const isValidOperations = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperations) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid API Paramaters" });
  }

  // check empty body
  if (Object.keys(req.body).length < 1) {
    return res
      .status(400)
      .json({ success: false, message: "Fields required in body" });
  }

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedReview) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    return res.json({
      success: true,
      message: "Review Updated",
      updatedReview,
    });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
});

// @desc    get a review
// @route   Get v1/review/:id
// @access  Public
const getReview = asyncHandler(async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id });
    return res.json(review);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({
      message: error.message,
      success: false,
      error: "Internal server error",
    });
  }
});

router.route("/reviews/").get(getReviews);
router.route("/review/:id").get(getReview);
router.route("/review/").post(postReview);
router.route("/review/:id").delete(deleteReview);
router.route("/review/:id").put(updateReview);

module.exports = router;
