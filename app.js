const { sendCategories } = require("./controllers/categories.controller");

const app = require("express")();

app.get("/api/categories", sendCategories);

module.exports = app;
