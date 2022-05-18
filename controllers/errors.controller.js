exports.handle404 = (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
};

exports.customErrorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
};
