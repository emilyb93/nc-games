exports.handle404 = (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
};

exports.customErrorHandler = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);

  }
};
exports.psqlErrorHandler = (err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);

  }
};

exports.errorHandler500 = (err, req, res) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
