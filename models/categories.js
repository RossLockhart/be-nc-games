const db = require("../db/connection.js");

exports.fetchCategories = (req, res) => {
  return db.query(`SELECT * FROM categories`).then((res) => res.rows);
};
exports.fetchReviews = (req, res) => {
  return db.query(`SELECT * FROM reviews`).then((res) => res.rows);
}; //current task
