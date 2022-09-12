const {
  fetchReviews,
  fetchReviewById,
  updateReviewVote,
} = require("../models/reviews");

exports.getReviews = (req, res, next) => {
  const { category } = req.query;
  console.log(category);
  fetchReviews(category)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => next(err));
};
exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => next(err));
};

exports.patchReviewVote = (req, res, next) => {
  const { reviews_id } = req.params;
  const { inc_votes } = req.body;

  updateReviewVote(reviews_id, inc_votes)
    .then((review) => {
      res.status(201).send({ review });
    })
    .catch((err) => next(err));
};
