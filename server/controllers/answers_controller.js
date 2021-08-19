const db = require("../db/db.js");

module.exports = {
  getAnswer: (req, response) => {
    const { question_id } = req.params;
    const { page = 1, count = 5 } = req.query;
    const interval = count * page - count;

      db.query(
        `
      SELECT
        a.id as id,
        a.body as body,
        a.date as date,
        a.answerer_name as answerer_name,
        a.helpful as helpful,
        COALESCE(
          ARRAY_AGG(
            JSON_BUILD_OBJECT(
              'id', photos.id,
              'url', photos.url
            )
          ) FILTER
          (
            WHERE
              photos.id
            IS NOT NULL),
        '{}')
        AS
          photos
      FROM
        answers a
      LEFT JOIN
        photos
      ON
        a.id = photos.answer_id
      WHERE
        a.question_id = $1
          AND
            a.reported = 'f'
      GROUP BY
        a.id
      LIMIT
        $2
      OFFSET
        $3`,
        [question_id, count, interval]
      )
      .then((results) => {
        let resultObj = {
          question_id: req.params.question_id,
          results: results.rows,
        };
        response.status(200).json(resultObj);
      })
      .catch((err) => {
        response.send(err);
      });
  },
  addAnswer: (req, res) => {
    var values = [
      req.params.question_id,
      req.body.body,
      req.body.name,
      req.body.email,
      req.body.photos,
    ];
    db.query(
      `WITH temp_answers AS (INSERT INTO answers(question_id, body, answerer_name, answerer_email, reported, helpful) VALUES ($1, $2, $3, $4, 'f', 0) RETURNING id)
    INSERT INTO photos(answer_id, url) SELECT id, UNNEST(($5)::text[]) FROM temp_answers`,
      values
    )
      .then((results) => {
        res.send("Answer Added!");
      })
      .catch((err) => {
        res.send(err);
      });
  },

  updateHelpfulAnswer: (request, response) => {
    const { answer_id } = request.params;
    db.query(
      `
      UPDATE
        answers
      SET
        helpful = helpful + 1
      WHERE
        id = $1`,
      [answer_id])
      .then((result) => {
        response.status(204).json(result.rows);
      })
      .catch((err) => {
        response.send("ERROR in UpdateHelpful Answers: ", err);
      });
  },

  reportAnswer: (request, response) => {
    const { answer_id } = request.params;
    db.query(
      `
      UPDATE
        answers
      SET
        reported = 't'
      WHERE
        id = $1`,
      [answer_id])
      .then((result) => {
        response.status(204).json(result.rows);
      })
      .catch((err) => {
        response.send("ERROR in Update Report Answers: ", err);
      });
  },
};
