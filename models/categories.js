const db = require("../db/connection.js");

exports.fetchCategories = () => {
  return db.query(`SELECT * FROM categories;`).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "404: Not found",
      });
    }
    return result.rows;
  });
};
