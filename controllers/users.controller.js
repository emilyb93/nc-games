const { fetchUsers } = require("../models/users.model.js");

exports.sendUsers = async (req, res, next) => {
  try {
    const users = await fetchUsers();

    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};
