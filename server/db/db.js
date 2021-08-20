const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: '18.220.179.209',
  database: 'questionsanswers',
  password: 'sdc',
  port: 5432
});

module.exports = pool;