const { createReadStream } = require("fs");

//create var readStream to set up a read stream from csv files
module.exports = {
  readQuestionsStream: createReadStream(
    "/Users/GriffinGeorgiadis/Downloads/questions.csv"
  ),
  readAnswersStream: createReadStream(
    "/Users/GriffinGeorgiadis/Desktop/HackReactor/Questions/exampleData/newShortAnswers.csv"
  ),
  readPhotosStream: createReadStream(
    "/Users/GriffinGeorgiadis/Desktop/HackReactor/Questions/exampleData/shortAnswers_photos.cvs"
  )
};