const { sendCategories } = require("./controllers/categories.controller");
const {
  handle404,
  customErrorHandler,
  psqlErrorHandler,
  errorHandler500,
} = require("./controllers/errors.controller.js");

const {
  sendReview,
  patchReview,
  sendAllReviews,
} = require("./controllers/reviews.controller.js");

const { sendUsers } = require("./controllers/users.controller.js");

const { sendComments } = require("./controllers/comments.controller.js");

const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/categories", sendCategories);

app.get("/api/reviews", sendAllReviews);

app.route("/api/reviews/:review_id").get(sendReview).patch(patchReview);

app.get("/api/:review_id/comments", sendComments);

app.get("/api/users", sendUsers);

app.all("/*", handle404);

app.use(psqlErrorHandler);

app.use(customErrorHandler);

app.use(psqlErrorHandler);

app.use(errorHandler500);

module.exports = app;
