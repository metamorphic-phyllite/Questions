const conn = require('./controller');

module.exports = {
  getToDo: (req, res) => {
    conn.getAll(req.body, (err, data) => {
      if (err) {
        console.log('ERROR in helper (getToDo): ', err);
        return res.send();
      }
      res.send(data);
    });
  }
};