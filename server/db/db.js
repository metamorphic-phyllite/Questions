const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'GriffinGeorgiadis',
  host: 'localhost',
  database: 'questionsanswers',
  password: 'password',
  port: 5432
});

module.exports = pool;