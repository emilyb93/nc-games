const db = require("../db/connection");

exports.fetchReview = async (id) => {
  if (isNaN(id)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  let queryStr = `SELECT * FROM reviews WHERE review_id = $1`;
  const queryVals = [id];

  const { rows } = await db.query(queryStr, queryVals);

  if (!rows.length) {
    return Promise.reject({ status: 404, msg: "Not Found" });
  }

  return rows[0];
};
