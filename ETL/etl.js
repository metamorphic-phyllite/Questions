const conn = require('../server/controllers/controller')
const { createReadStream, createWriteStream } = require('fs');
const stream = require('stream');
const { Transform } = require('stream');
const util = require('util');
const csv = require('csvtojson');

//create var readStream to set up a read stream from short Questions.cvs
const readStream = createReadStream('/Users/GriffinGeorgiadis/Desktop/HackReactor/Questions/data/shortQuestions.cvs');
//create var writeStream that opens a write stream to a file
// const writeStream = createWriteStream('/Users/GriffinGeorgiadis/Desktop/HackReactor/Questions/data/COPYshortQuestions.txt');
//turn pipeline into promise instead of callback
const pipeline = util.promisify(stream.pipeline);
//parse header row then creates a ojbect to get key name then creat json object each row in csv file
const csvParser = csv();

//trasform data stream
const trasformStream = new Transform({
  //transform method on Trasform stream
  transform(chunk, encoding, cb) {
    try {
      var obj = chunk.toString();
      console.log(obj);
      // conn.createQuestions(JSON.parse(chunk), (err, data) => {
      //   if (err) {
      //     console.log('Error adding data to qestions DB: ', err);
      //   } else {
      //     console.log('Success! ', data);
      //   }
      // });
    } catch (err) {
      cb(err, null);
    }
  }
})



const run = async () => {
  try {
    await pipeline(
      readStream,
      csvParser,
      trasformStream
      // writeStream
    );
    console.log('Pipeline succeeded');
  } catch (err) {
    console.log('Pipeline failed', err);
  }
}

run();







// //using EventEmmitter, reading from a stream the 'readable' way
// const { createReadStream } = require('fs');
// const stream = createReadStream('/Users/GriffinGeorgiadis/Desktop/HackReactor/Questions/data/shortQuestions.cvs');+

// //this allow to read data when availible
// stream.on('readable', (chunk) => {
//   while((chunk = stream.read()) !== null) {
//     console.log(chunk.toString());
//   }
// })

// stream.on('end', () => {
//   //stream finished
// })