const { Transform } = require("stream");

//trasform data streams
module.exports = {
  transformQuestionsStream: new Transform({
    transform(chunk, encoding, cb) {
      try {
        var transformedData = JSON.parse(chunk.toString());
        transformedData.id = parseInt(transformedData.id);
        transformedData.product_id = parseInt(transformedData.product_id);
        transformedData.reported = parseInt(transformedData.reported);
        transformedData.helpful = parseInt(transformedData.helpful);
        var date = new Date(parseInt(transformedData.date_written));
        transformedData.date_written = date.toLocaleString();
        transformedData.reported = transformedData.reported ? true : false;
        //check to see if there is an apostrophe in the strings
        if (transformedData.body.includes("'")) {
          var newbody = transformedData.body.split("'");
          transformedData.body = newbody[0] + "''" + newbody[1];
        }
        if (transformedData.asker_email.includes("'")) {
          var newAskerEmail = transformedData.asker_email.split("'");
          transformedData.asker_email =
            newAskerEmail[0] + "''" + newAskerEmail[1];
        }
        if (transformedData.asker_name.includes("'")) {
          var newAskerName = transformedData.asker_name.split("'");
          transformedData.asker_name = newAskerName[0] + "''" + newAskerName[1];
        }

        //turn data back into buffer type
        transformedData = Buffer.from(JSON.stringify(transformedData));
        cb(null, transformedData);
      } catch (err) {
        cb(err, null);
      }
    },
  }),
  transformAnswersStream: new Transform({
    transform(chunk, encoding, cb) {
      try {
        var transformedData = JSON.parse(chunk.toString());
        transformedData.id = parseInt(transformedData.id);
        transformedData.question_id = parseInt(transformedData.question_id);
        transformedData.reported = parseInt(transformedData.reported);
        transformedData.helpful = parseInt(transformedData.helpful);
        var date = new Date(parseInt(transformedData.date_written));
        transformedData.date_written = date.toLocaleString();
        transformedData.reported = transformedData.reported ? true : false;
        //check to see if there is an apostrophe in the strings
        if (transformedData.body.includes("'")) {
          var newbody = transformedData.body.split("'");
          transformedData.body = newbody[0] + "''" + newbody[1];
        }
        if (transformedData.answerer_email.includes("'")) {
          var newAnswererEmail = transformedData.answerer_email.split("'");
          transformedData.answerer_email = newAnswererEmail[0] + "''" + newAnswererEmail[1];
        }
        if (transformedData.answerer_name.includes("'")) {
          var newAnswererName = transformedData.answerer_name.split("'");
          transformedData.answerer_name = newAnswererName[0] + "''" + newAnswererName[1];
        }

        //turn data back into buffer type
        transformedData = Buffer.from(JSON.stringify(transformedData));
        cb(null, transformedData);
      } catch (err) {
        cb(err, null);
      }
    },
  }),
  transformPhotosStream: new Transform({
    transform(chunk, encoding, cb) {
      try {
        var transformedData = JSON.parse(chunk.toString());
        transformedData.id = parseInt(transformedData.id);
        transformedData.answer_id = parseInt(transformedData.answer_id);
        if (transformedData.url.includes("'")) {
          var newUrl = transformedData.url.split("'");
          transformedData.url = newUrl[0] + "''" + newUrl[1];
        }

        //turn data back into buffer type
        transformedData = Buffer.from(JSON.stringify(transformedData));
        cb(null, transformedData);
      } catch (err) {
        cb(err, null);
      }
    },
  })

};