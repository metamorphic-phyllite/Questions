const express = require('express');
const router = express.Router();
const { getAnswer, addAnswer, updateHelpfulAnswer, reportAnswer } = require('./controllers/answers_controller');
const { getQuestion, addQuestion, updateHelpfulQuestion, reportQuestion } = require('./controllers/questions_controller');


// QA API
router.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('Hello World!')
});
router.get('/qa/questions/:product_id', getQuestion); //tested avg: 8ms
router.get('/qa/questions/:question_id/answers', getAnswer);
router.post('/qa/questions', addQuestion);
router.post('/qa/questions/:question_id/answers', addAnswer);
router.put('/qa/questions/:question_id/helpful', updateHelpfulQuestion);
router.put('/qa/questions/:question_id/report', reportQuestion);
router.put('/qa/answers/:answer_id/helpful', updateHelpfulAnswer);
router.put('/qa/answers/:answer_id/report', reportAnswer);


module.exports = router;