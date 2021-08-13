DROP DATABASE questionsanswers;
CREATE DATABASE questionsanswers;


CREATE TABLE questions (
  id serial PRIMARY KEY,
  product_id INT,
  body VARCHAR (255),
  date_written DATE,
  asker_name VARCHAR (60),
  asker_email VARCHAR (60),
  reported BOOLEAN,
  helpful INT
);

CREATE TABLE answers (
  id serial PRIMARY KEY,
  questions_id INT NOT NULL,
  FOREIGN KEY (questions_id) REFERENCES questions (id),
  body VARCHAR (255),
  date_written DATE,
  answerer_name VARCHAR (60),
  answerer_email VARCHAR (60),
  reported BOOLEAN,
  helpful INT
);

CREATE TABLE photos (
  id serial PRIMARY KEY,
  answers_id INT NOT NULL,
  FOREIGN KEY (answers_id) REFERENCES answers (id),
  url VARCHAR (120)
);
