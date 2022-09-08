const { response } = require("../app.js");
const db = require("../db/connection.js");

exports.fetchReview = (review_id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1; `, [review_id])
    .then((result) => {
      const returnedReview = result.rows;
      if (returnedReview.length < 1) {
        return Promise.reject({
          status: 404,
          msg: `404: Not found`,
        });
      }
      return returnedReview;
    });
};

exports.updateReviewVote = (review_id, votes) => {
  const query = `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *`;
  return db.query(query, [votes, review_id]).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "404: Not found",
      });
    }
    return result.rows[0];
  });
};
