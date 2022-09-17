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
  console.log("1111", reviews_id);
  const { inc_votes } = req.body;
  const bannedWords = /\b\w?(DRO|INSER|LIK|AN|pg_slee)\w\b/g;
  const bannedCharacters = /\?|%|--|\(|/g;

  if (reviews_id.match(bannedCharacters) || reviews_id.match(bannedWords)) {
    return res.status(400).json({
      msg: `Invalid request input`,
    }); //this returns undefined
  }
  // if (typeof reviews_id !== "number") {
  //   return Promise.reject({
  //     status: 400,
  //     msg: `400: Invalid request input`,
  //   });
  // }

  updateReviewVote(reviews_id, inc_votes)
    .then((review) => {
      res.status(201).send({ review });
    })
    .catch((err) => next(err));
};
//};

///////////////////////////////////////////////////////////
