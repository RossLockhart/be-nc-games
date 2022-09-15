const {
  fetchReviews,
  fetchReviewById,
  updateReviewVote,
} = require("../models/reviews");
//////////////////////////
exports.voteNumberValidator = (numToChangeBy) => {
  if (numToChangeBy != 1 || numToChangeBy != -1) {
    throw new Error("Invalid request input");
  }
};
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
  const { inc_votes } = req.body;
  voteNumberValidator(inc_votes);
  // console.log(999, inc_votes);
  // if (inc_votes !== 1 || inc_votes !== -1) {
  //   throw new Error("Invalid request input");
  // } else {
  updateReviewVote(reviews_id, inc_votes)
    .then((review) => {
      res.status(201).send({ review });
    })
    .catch((err) => next(err));
};
//};

///////////////////////////////////////////////////////////
//this should be what is needed for the anti sql injection
/* if (votes) {
     //  NOT Array.includes(<ITEM TO FIND IN ARRAY>)
     if (!["age", "cost_at_auction", "treasure_name"].includes(sort_by)) {
           throw new Error("Invalid query - sort_by");
            */
