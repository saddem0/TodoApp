const express = require('express');
const app = express();
const port = 3000;
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});
const api = require('./server/routing/api');
app.use('/api', api);

const auth = require('./server/routing/auth');
app.use('/auth', auth);


app.listen(port, err => {
  if (err) throw err;
  console.log(`the server is running on port ${port}`)
});
