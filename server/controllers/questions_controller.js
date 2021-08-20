const db = require("../db/db.js");

module.exports = {
  getQuestion: (req, res) => {
    var count = parseInt(req.params.count) || 5;
    var page = parseInt(req.params.page) || 1;
    var number = count * page - count;
    values = [number, count, parseInt(req.params.product_id)];

    db.query(
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
      values)
      .then((results) => {
        if (!parseInt(req.params.product_id)) {
          res.status(422).send("err: invalid product_id");
        } else {
          var resultObj = {
            product_id: parseInt(req.params.product_id),
            results: results.rows,
          };
          res.status(200).json(resultObj);
        }
      })
      .catch((err) => {
        res.send("err in query call" + err);
      });
    },
    addQuestion: (req, res) => {
      console.log(req.body);
      const { body, name, email, product_id, reported, question_helpfulness, question_date } = req.body;
      db.query(`
        INSERT INTO
          questions
          (product_id, question_body, asker_name, asker_email, reported, question_helpfulness, question_date)
        VALUES
          ($4,$1,$2,$3, $5, $6, $7)`, [body, name, email, product_id, reported, question_helpfulness, question_date])
        .then((results) => {
          res.send('Created');
        })
        .catch((err) => {
          res.send(err);
        })
    },
    updateHelpfulQuestion: (request, response) => {
      const { question_id } = request.params;
      db.query(
        `
        UPDATE
          questions
        SET
          question_helpfulness = question_helpfulness + 1
        WHERE
          id = $1`,
        [question_id])
        .then((result) => {
          response.status(204).json(result.rows);
        })
        .catch((err) => {
          response.send("ERROR in UpdateHelpful Questions: " + err);
        });
    },
    reportQuestion: (request, response) => {
      const { question_id } = request.params;
      db.query(
        `
        UPDATE
          questions
        SET
          reported = 't'
        WHERE
          id = $1`,
        [question_id])
        .then((result) => {
          response.status(204).json(result.rows);
        })
        .catch((err) => {
          response.send("ERROR in Update Report Questions: " + err);
        });
    }
  }