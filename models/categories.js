const db = require("../db/connection.js");

exports.fetchCategories = (req, res) => {
  return db.query(`SELECT * FROM categories`).then((res) => res.rows);
};
// the sql needs changing and properties need adding
