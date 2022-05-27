const { fetchComments, insertComment } = require("../models/comments.model.js");

exports.sendComments = async (req, res, next) => {
  try {
    const { review_id: reviewId } = req.params;
    const comments = await fetchComments(reviewId);

    res.status(200).send({ comments });
  } catch (err) {
    next(err);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const newComment = req.body;
    const { review_id: reviewId } = req.params;

    const comment = await insertComment(reviewId, newComment);

    res.status(201).send({ comment });
  } catch (err) {
    next(err);
  }
};
