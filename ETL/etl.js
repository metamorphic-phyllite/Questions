const stream = require('stream');
const util = require('util');
const csv = require('csvtojson');

const { readQuestionsStream, readAnswersStream, readPhotosStream } = require('./streams/readStreams');
const { transformQuestionsStream, transformAnswersStream, transformPhotosStream } = require('./streams/transformStreams');
const { writeQuestionsStream, writeAnswersStream, writePhotosStream } = require('./streams/writeStreams');

//turn pipeline into promise instead of callback
const pipeline = util.promisify(stream.pipeline);
//parse header row then creates a ojbect to get key name then creat json object each row in csv file
const csvParser = csv();

//create Pipelines for data
const questionsPipeline = async () => {
  try {
    await pipeline(
      readQuestionsStream,
      csvParser,
      transformQuestionsStream,
      writeQuestionsStream
      );
    console.log("Questions pipeline succeeded");
  } catch (err) {
    console.log("Questions pipeline failed:", err);
  }
};


const answersPipeline = async () => {
  try {
    await pipeline(
      readAnswersStream,
      csvParser,
      transformAnswersStream,
      writeAnswersStream
      );
    console.log("Answers pipeline succeeded");
  } catch (err) {
    console.log("Answers pipeline failed:", err);
  }
};


const photosPipeline = async () => {
  try {
    await pipeline(
      readPhotosStream,
      csvParser,
      transformPhotosStream,
      writePhotosStream
      );
    console.log("Photos pipeline succeeded");
  } catch (err) {
    console.log("Photos pipeline failed:", err);
  }
};
questionsPipeline();
// answersPipeline();
// photosPipeline();





