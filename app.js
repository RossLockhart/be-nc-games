//all saves should be made to github first,
// and then saved to heroku: git push heroku main

const express = require("express");
const { getCategories } = require("./controllers/categories");
const {
  getReviews,
  getReviewById,
  patchReviewVote,
} = require("./controllers/reviews");
const { getUsers } = require("./controllers/users");
const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewById);
app.get("/api/users", getUsers);
app.patch("/api/reviews/:reviews_id", patchReviewVote);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "23502") {
    res.status(400).send({ msg: "Invalid request input" });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid request input" });
  } else if (err.code === "P0002") {
    res.status(404).send({ msg: "404: Not found" });
  } else {
    console.log(err);
    res.status(500).send({ msg: "Internal server error" });
  }
});

module.exports = app;
