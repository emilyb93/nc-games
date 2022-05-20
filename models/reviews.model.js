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
    throw new Error({ status: 404, msg: "Review Not Found" });
  }

  return rows[0];
};
