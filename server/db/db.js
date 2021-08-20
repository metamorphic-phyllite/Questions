const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'ubuntu',
  host: 'ec2-18-220-179-209.us-east-2.compute.amazonaws.com',
  database: 'questionsanswers',
  password: 'sdc',
  port: 5432
});

module.exports = pool;