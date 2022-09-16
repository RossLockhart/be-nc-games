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
  //console.log(category);
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
  //protect against sql injection here- check we already made it to only accept numbers as well
  console.log("aids", req.params);
  const { inc_votes } = req.body;
  // if (typeof reviews_id !== "number") {
  //   return Promise.reject({
  //     status: 400,
  //     msg: `400: Invalid request input`,
  //   });
  // }
  //protect against sql injection here
  //console.log(2, inc_votes);

  updateReviewVote(reviews_id, inc_votes)
    .then((review) => {
      console.log(review);
      res.status(201).send({ review });
    })
    .catch((err) => next(err));
};
//};

///////////////////////////////////////////////////////////
