const { fetchReview } = require("../models/reviews.model.js");

exports.sendReview = async (req, res, next) => {
  try {
    const { review_id: reviewId } = req.params;

    const review = await fetchReview(reviewId);

    res.status(200).send({ review });
  } catch (err) {
    next(err);
  }
};
