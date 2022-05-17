const db = require("../db/connection");

exports.fetchCategories = async () => {
  const { rows } = await db.query("SELECT * FROM categories;");

  return rows;
};
