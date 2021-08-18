const pool = require("../db/db.js");

module.exports = {
  getAllQuestions: (req, res) => {
    // var page = 1;
    // var count = 5;
    // if (req.params.page !== undefined) { page = parseInt(req.params.page); }
    // if (req.params.count !== undefined) { count = parseInt(req.params.count); }
    console.log("param: ", parseInt(req.params.product_id));

    var count = parseInt(req.params.count) || 5;
    var page = parseInt(req.params.page) || 1;
    var number = count * page - count;
    values = [number, count, parseInt(req.params.product_id)];
    console.log(values);

    pool.query(
      `SELECT questions.id AS question_id,
      questions.question_body,
      questions.question_date,
      questions.asker_name,
      questions.question_helpfulness,
      questions.reported,
      COALESCE(JSON_OBJECT_AGG(answers.id,
        JSON_BUILD_OBJECT('id', answers.id, 'body', answers.body, 'date', answers.date, 'answerer_name', answers.answerer_name, 'helpful', answers.helpful, 'photos', ARRAY(
          SELECT photos.url
          FROM photos
          WHERE photos.answer_id = answers.id
        ))) FILTER (WHERE answers.id IS NOT NULL), '{}'::JSON) AS answers
        FROM questions
        LEFT JOIN answers
        ON questions.id = answers.question_id
        WHERE questions.product_id = $3 AND questions.reported = false
        GROUP BY questions.id
        LIMIT $2
        OFFSET $1`,
      values,
      (err, results) => {
        if (err) {
          res.send("Error in query call");
        }
        if (!parseInt(req.params.product_id)) {
          res.status(422).send("ERROR: invalid product_id");
        } else {
          var resultObj = {
            product_id: parseInt(req.params.product_id),
            results: results.rows,
          };
          res.status(200).json(resultObj);
        }
      }
    );
  },
  getAllAnswers: (req, res) => {
    pool.query(
      `SELECT * FROM answers WHERE question_id = ${parseInt(
        req.params.question_id
      )}`,
      (err, data) => {
        if (err) {
          res.send(err);
        }
        res.send(data.rows);
      }
    );
  },
  updateHelpful: (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(
      `Update questions SET helpful WHERE id = $${req.params.id}`,
      (err, data) => {
        if (err) {
          res.send(err);
        }
        res.send(data);
      }
    );
  },
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
  },
};
