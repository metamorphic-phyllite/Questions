const express = require('express');
const router = express.Router();
const { getAllQuestions, getAllAnswers } = require('./controllers/controller');


// QA API
router.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('Hello World!')
})
router.get('/qa/questions/:product_id', getAllQuestions);
router.get('/qa/questions/:question_id/answers', getAllAnswers);
// router.post('/qa/questions', addToDo);
// router.post('/qa/questions/:question_id/answers', addToDo);
// router.put('/qa/questions/:question_id/helpful', updateToDo);
// router.put('/qa/questions/:question_id/report', updateToDo);
// router.put('/qa/answers/:answer_id/helpful', updateToDo);
// router.put('/qa/answers/:answer_id/report', updateToDo);


module.exports = router;