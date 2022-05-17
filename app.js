const { sendCategories } = require("./controllers/categories.controller");
const { handle404 } = require("./controllers/errors.controller.js");

const app = require("express")();

app.get("/api/categories", sendCategories);

app.all("/*", handle404);

module.exports = app;
