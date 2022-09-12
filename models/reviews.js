const { response } = require("../app.js");
const db = require("../db/connection.js");

exports.fetchReviews = (category) => {
  let queryValues = [];
  let query = `SELECT reviews.*, COUNT(comments.review_id) ::INT AS comment_count FROM reviews `;
  query += `LEFT JOIN comments ON comments.review_id = reviews.review_id `;
  if (category !== undefined) {
    queryValues.push(category);
    query += `WHERE reviews.category = $1`;
  }
  query += `GROUP BY reviews.review_id `;
  query += `ORDER BY created_at DESC`;

  return db.query(query, queryValues).then((result) => {
    console.log(1, result);
    const returnedReview = result.rows;
    console.log(2, returnedReview);
    if (returnedReview.length < 1) {
      return Promise.reject({
        status: 404,
        msg: `404: ${category} Not found`,
      });
    }
    return returnedReview;
  });
};

exports.fetchReviewById = (review_id) => {
  return db
    .query(
      `SELECT
      reviews.*,
      COUNT(comments.review_id) ::INT AS comment_count FROM
      reviews
      LEFT JOIN
      comments ON comments.review_id = reviews.review_id
      WHERE
      reviews.review_id = $1 GROUP BY reviews.review_id;`,
      [review_id]
    )
    .then((result) => {
      const returnedReview = result.rows;
      if (returnedReview.length < 1) {
        return Promise.reject({
          status: 404,
          msg: `404: ${review_id} Not found`,
        });
      }
      return returnedReview[0];
    });
};

exports.updateReviewVote = (review_id, votes) => {
  const query = `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *`;
  return db.query(query, [votes, review_id]).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `404: ${review_id} Not found`,
      });
    }
    return result.rows[0];
  });
};
