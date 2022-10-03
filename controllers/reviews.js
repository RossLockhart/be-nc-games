const {
  fetchReviews,
  fetchReviewById,
  updateReviewVote,
} = require("../models/reviews");
//////////////////////////
// exports.voteNumberValidator = (numToChangeBy) => {
//   if (numToChangeBy != 1 || numToChangeBy != -1) {
//     throw new Error("Invalid request input");
//   }
// };
///////////////////
exports.getReviews = (req, res, next) => {
  const { category } = req.query;

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
//////////////////////////////////////////////////////////
exports.patchReviewVote = (req, res, next) => {
  const { reviews_id } = req.params;
  const { inc_votes } = req.body;

  updateReviewVote(reviews_id, inc_votes)
    .then((review) => {
      res.status(201).send({ review });
    })
    .catch((err) => next(err));
};
//};

///////////////////////////////////////////////////////////
