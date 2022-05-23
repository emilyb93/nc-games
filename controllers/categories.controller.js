const { fetchCategories } = require("../models/categories.model.js");

exports.sendCategories = async (req, res, next) => {
  try {
    const categories = await fetchCategories();

    res.status(200).send({ categories });
  } catch (err) {
    next(err);
  }
};
