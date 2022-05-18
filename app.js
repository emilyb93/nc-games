const { sendCategories } = require("./controllers/categories.controller");
const {
  handle404,
  customErrorHandler,
} = require("./controllers/errors.controller.js");
const { sendReview } = require("./controllers/reviews.controller.js");

const app = require("express")();

app.use(express.json());

app.get("/api/categories", sendCategories);

app.route("/api/reviews/:review_id").get(sendReview).patch(updateReview);

app.all("/*", handle404);

app.use(customErrorHandler);

module.exports = app;
