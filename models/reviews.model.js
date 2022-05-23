const db = require("../db/connection");

exports.fetchReview = async (reviewId) => {
  if (isNaN(reviewId)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  let queryStr = `SELECT * FROM reviews WHERE review_Id = $1`;
  const queryVals = [reviewId];

  const { rows } = await db.query(queryStr, queryVals);

  if (!rows.length) {
    return Promise.reject({ status: 404, msg: "Not Found" });
  }

  return rows[0];
};
