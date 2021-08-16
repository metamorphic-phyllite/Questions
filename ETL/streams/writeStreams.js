const conn = require("../../server/controllers/controller");
const { Writable } = require("stream");


//create var writeStream that opens a write stream to postgres database
module.exports = {
  writeQuestionsStream: new Writable({
    write: (chunk, _, done) => {
      conn.createQuestions(JSON.parse(chunk.toString()), (err, data) => {
        if (err) {
          console.log("Error adding data to qestions DB: ", err);
        } else {
          console.log("Added to Questions Data!");
        }
      });
      done();
    }
  }),
  writeAnswersStream: new Writable({
    write: (chunk, _, done) => {
      conn.createAnswers(JSON.parse(chunk.toString()), (err, data) => {
        if (err) {
          console.log("Error adding data to answers DB: ", err);
        } else {
          console.log("Added to Answers Data!");
        }
      });
      done();
    }
  }),
  writePhotosStream: new Writable({
    write: (chunk, _, done) => {
      conn.createPhotos(JSON.parse(chunk.toString()), (err, data) => {
        if (err) {
          console.log("Error adding data to photos DB: ", err);
        } else {
          console.log("Added to Photos Data!");
        }
      });
      done();
    }
  })
};


