const conn = require("../../server/controllers/controller");
const { Writable } = require("stream");

var counter = 0;
//create var writeStream that opens a write stream to postgres database
module.exports = {
  writeQuestionsStream: new Writable({
    write: (chunk, _, done) => {
      conn.createQuestions(JSON.parse(chunk.toString()), (err, data) => {
        if (err) {
          console.log("Error adding data to qestions DB: ", err);
        } else {
          counter++;
          if (counter % 10000 === 0) {
            console.log("Added to Questions DB!", counter);
          }
          done();
        }
      });
    }
  }),
  writeAnswersStream: new Writable({
    write: (chunk, _, done) => {
      conn.createAnswers(JSON.parse(chunk.toString()), (err, data) => {
        if (err) {
          console.log("Error adding data to answers DB: ", err);
        } else {
          counter++;
          if (counter % 10000 === 0) {
            console.log("Added to Answers DB!", counter);
          }
          done();
        }
      });
    }
  }),
  writePhotosStream: new Writable({
    write: (chunk, _, done) => {
      conn.createPhotos(JSON.parse(chunk.toString()), (err, data) => {
        if (err) {
          console.log("Error adding data to photos DB: ", err);
        } else {
          counter++;
          if (counter % 10000 === 0) {
            console.log("Added to Photos DB!", counter);
          }
          done();
        }
      });
    }
  })
};


