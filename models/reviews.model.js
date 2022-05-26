const db = require("../db/connection");

exports.fetchReview = async (id) => {
  let queryStr = `SELECT * FROM reviews WHERE review_id = $1`;
  const queryVals = [id];

  const { rows } = await db.query(queryStr, queryVals);

  if (!rows.length) {
    return Promise.reject({ status: 404, msg: "Not Found" });
  }

  return rows[0];
};

exports.updateReview = async (id, { inc_votes }) => {
  const { rows } = await db.query(
    "UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING * ",
    [inc_votes, id]
  );

  if (!rows.length) {
    return Promise.reject({ status: 404, msg: "Review Not Found" });
  }

  return rows[0];
};

exports.fetchAllReviews = async () => {
  const { rows } = await db.query(
    "SELECT r.category, r.created_at, r.owner, r.review_id, r.review_img_url, r.title, r.votes, COUNT(c.review_id)::int AS comment_count FROM reviews AS r LEFT JOIN comments AS c ON r.review_id = c.review_id GROUP BY r.review_id ORDER BY created_at DESC "
  );

  return rows;
};
