//this file was for me to rebuild the fetchReviews model in reviews/models
//for test:  "returns error if category exists but has not been reviewed"
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
      let safteyNet = `SELECT categories.* WHERE categories.slug = reviews.category;`;
      return db.query(safteyNet, queryValues).then((altResult) => {
        retrunedReview = altResult.rows;
      });
    } else {
      return Promise.reject({
        status: 404,
        msg: `404: ${category} Not found`,
      });
    }
    //return returnedReview;
  });
};

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
//returnedReview.length < 1
//then check categories for the category to see it at least exists
//if it does send the key back in an an arraywith no value
//otherwise, coontinue with the promis.reject because it genuinely doesn't exist
