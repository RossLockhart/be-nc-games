const { fetchReview, updateReviewVote } = require("../models/reviews");

exports.getReview = (req, res, next) => {
  const { review_id } = req.params;
  fetchReview(review_id)
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

  //
};
