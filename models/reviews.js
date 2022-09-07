const db = require("../db/connection.js");

exports.fetchReview = (review_id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1; `, [review_id])
    .then((result) => {
      const returnedReview = result.rows;
      if (returnedReview.length < 1) {
        return Promise.reject({
          status: 404,
          msg: `${review_id} Not found`,
        });
      }
      return returnedReview;
    });
};
