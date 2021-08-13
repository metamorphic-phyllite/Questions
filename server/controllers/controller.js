const pool = require('../db/db.js');

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
    console.log(req);
    pool.query(`INSERT INTO questions ${req}`, (err, data) => {
      if(err) {
        res(err, null)
      }
      res(null, data);
    })
  }

};
