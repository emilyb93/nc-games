const db = require("../db/connection.js");

exports.fetchComments = async (reviewId) => {
  const commentsQuery = db.query(
    "SELECT * FROM comments WHERE review_id = $1",
    [reviewId]
  );
  const reviewQuery = db.query(
    "SELECT r.review_id FROM reviews AS r WHERE review_id = $1",
    [reviewId]
  );

  const [comments, reviews] = await Promise.all([commentsQuery, reviewQuery]);

  if (!reviews.rows.length) {
    console.log("querys made");
    return Promise.reject({ status: 404, msg: "Not Found" });
  }

  return comments.rows;
};
