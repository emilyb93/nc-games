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
} = require("./controllers/reviews.controller.js");
  
const { sendUsers } = require("./controllers/users.controller.js");

const express = require("express");
const app = express();




app.use(express.json());

app.get("/api/categories", sendCategories);

app.route("/api/reviews/:review_id").get(sendReview).patch(patchReview);

app.get("/api/users", sendUsers);

app.all("/*", handle404);

app.use(psqlErrorHandler);

app.use(customErrorHandler);

app.use(psqlErrorHandler);

app.use(errorHandler500);

module.exports = app;
