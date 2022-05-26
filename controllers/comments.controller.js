const { fetchComments } = require("../models/comments.model.js");

exports.sendComments = async (req, res, next) => {
  const { review_id: reviewId } = req.params;
  const comments = await fetchComments(reviewId);

  res.status(200).send({ comments });
};
