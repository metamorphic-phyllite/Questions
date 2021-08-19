-- DROP DATABASE questionsanswers;
-- CREATE DATABASE questionsanswers;

-- DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
  id serial PRIMARY KEY,
  product_id INT,
  body VARCHAR (255),
  question_date DATE,
  asker_name VARCHAR (60),
  asker_email VARCHAR (60),
  reported BOOLEAN,
  helpful INT
);

-- DROP TABLE IF EXISTS answers CASCADE;
-- CREATE TABLE answers (
--   id serial PRIMARY KEY,
--   question_id INT NOT NULL,
--   body VARCHAR (255),
--   date_written DATE,
--   answerer_name VARCHAR (60),
--   answerer_email VARCHAR (60),
--   reported BOOLEAN,
--   helpful INT,
--   FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
-- );

-- DROP TABLE IF EXISTS photos CASCADE;
-- CREATE TABLE photos (
--   id serial PRIMARY KEY,
--   answer_id INT NOT NULL,
--   url VARCHAR (255),
--   FOREIGN KEY (answer_id) REFERENCES answers(id) ON DELETE CASCADE
-- );
