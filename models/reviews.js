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
    //console.log(1, result);
    const returnedReview = result.rows;
    //console.log(2, returnedReview);
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
////////////////////////////////////////////////
//consider an array on banned terms such as [DROP, INSERT, LIKE, AND, pg_sleep(, --, %, ? ]
//and then creating a regex checker and doing a .match() against the query in an if statement and if part of the query matches a banned word throw an error,
//to match the banned WORDS:      /\b\w?(DRO|INSER|LIK|AN|pg_slee)\w\b/g
//to match the banned charcaters: /\?|%|--|\(|/g
// to match in combination-- warning: in some cases may match everythign- but i checked it on sql injection and paragraphs of text:     np
//and an array for the things tat MUST be included e.g review_id, votes
exports.updateReviewVote = (review_id, votes) => {
  const query = `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *`; //doesnt use string concatenation or template literals
  return db.query(query, [votes, review_id]).then((result) => {
    if (typeof votes !== "number") {
      return Promise.reject({
        status: 400,
        msg: `400: Invalid request input`,
      });
    }
    // if (typeof review_id !== "number") {
    //   return Promise.reject({
    //     status: 400,
    //     msg: `400: Invalid request input`,
    //   }); //this makes me fail tests lines: 186 and 141for getting 404 when here i expect 400
    // } //for the 141 its because the api is a string so 9999 and pg_sleep are just treated as
    // //strings for id_that don't exist rather than an invalid input
    if (votes > 1 || votes < -1) {
      return Promise.reject({
        status: 400,
        msg: `400: Invalid request input`,
      });
    }
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `404: ${review_id} Not found`,
      });
    }
    return result.rows[0];
  });
};

//sql section from notes
// https://notes.northcoders.com/courses/js-back-end/node-postgres

//seperate sql injection validator- not in the patch request above- and associated tests
//make tests for the test, that are for the voteNumberValidataor
//////////////////////////////////////////////////
//this should be what is needed for the anti sql injection
/* if (votes) {
     //  NOT Array.includes(<ITEM TO FIND IN ARRAY>)
     if (!["age", "cost_at_auction", "treasure_name"].includes(sort_by)) {
           throw new Error("Invalid query - sort_by");
            */
