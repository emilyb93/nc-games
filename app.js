const { sendCategories } = require("./controllers/categories.controller");
const {
  handle404,
  customErrorHandler,
} = require("./controllers/errors.controller.js");
const { sendUsers } = require("./controllers/users.controller.js");
const { sendReview } = require("./controllers/reviews.controller.js");

const app = require("express")();

app.get("/api/categories", sendCategories);

app.get("/api/reviews/:review_id", sendReview);

app.get("/api/users", sendUsers);

app.all("/*", handle404);

app.use(customErrorHandler);

module.exports = app;
