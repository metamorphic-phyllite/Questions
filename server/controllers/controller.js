const pool = require("../db/db.js");

module.exports = {
  // getAll: (req, res) => {
  //   pool.query(`SELECT * FROM ${var for data here}`, (err, data) => {
  //     if (err) {
  //       res(err, null);
  //     }
  //     res(null, data);
  //   });
  // },
  createQuestions: (req, res) => {
    pool.query(
      `INSERT INTO questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES (${req.id}, ${req.product_id}, '${req.body}', '${req.date_written}', '${req.asker_name}', '${req.asker_email}', ${req.reported}, ${req.helpful})`,
      (err, data) => {
        if (err) {
          res(err, null);
        }
        res(null, data);
      }
    );
  },
  createAnswers: (req, res) => {
    pool.query(
      `INSERT INTO answers (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES
      (${req.id}, ${req.question_id}, '${req.body}', '${req.date_written}', '${req.answerer_name}', '${req.answerer_email}', ${req.reported}, ${req.helpful})`,
      (err, data) => {
        if (err) {
          res(err, null);
        }
        res(null, data);
      }
    );
  },
  createPhotos: (req, res) => {
    pool.query(
      `INSERT INTO photos (id, answer_id, url) VALUES (${req.id}, ${req.answer_id}, '${req.url}')`,
      (err, data) => {
        if (err) {
          res(err, null);
        }
        res(null, data);
      }
    );
  }
};
