const db = require("../db/connection.js");

exports.fetchComments = async (reviewId) => {
  const { rows } = await db.query(
    "SELECT * FROM comments WHERE review_id = $1",
    [reviewId]
  );

  return rows;
};
