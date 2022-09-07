const express = require("express");
const { getCategories } = require("./controllers/categories");
const { getReview } = require("./controllers/reviews");
const { getUsers } = require("./controllers/users");
const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReview);
app.get("/api/users", getUsers);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid request input" });
  } else if (err.code === "P0002") {
    res.status(404).send({ msg: "Not found" });
  } else {
    res.status(500).send({ msg: "Internal server error" });
  }
});

module.exports = app;
