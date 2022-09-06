const express = require("express");
const { getCategories, getReviews } = require("./controllers/categories");
const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews); //current task

app.use((err, req, res, next) => {
  res.status(500).send({ msg: err.message });
});

module.exports = app;
