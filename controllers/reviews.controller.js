const {
  fetchReview,
  updateReview,
  fetchAllReviews,
} = require("../models/reviews.model.js");

exports.sendReview = async (req, res, next) => {
  try {
    const { review_id: reviewId } = req.params;

    const review = await fetchReview(reviewId);

    res.status(200).send({ review });
  } catch (err) {
    next(err);
  }
};

exports.patchReview = async (req, res, next) => {
  try {
    const voteObj = req.body;
    const { review_id: reviewId } = req.params;

    const review = await updateReview(reviewId, voteObj);

    res.status(200).send({ review });
  } catch (err) {
    next(err);
  }
};

exports.sendAllReviews = async (req, res, next) => {
  try {
    const reviews = await fetchAllReviews();

    res.status(200).send({ reviews });
  } catch (err) {
    next(err);
  }
};
