const { createReadStream } = require("fs");




//create var readStream to set up a read stream from csv files
module.exports = {
  readQuestionsStream: createReadStream(
    "/Users/GriffinGeorgiadis/Downloads/questions.csv"
  ),
  readAnswersStream: createReadStream(
    "/Users/GriffinGeorgiadis/Downloads/answers.csv"
  ),
  readPhotosStream: createReadStream(
    "/Users/GriffinGeorgiadis/Downloads/answers_photos.csv"
  )
};