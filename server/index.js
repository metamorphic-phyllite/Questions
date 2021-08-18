const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes.js');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});