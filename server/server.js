var express = require('express')
var config = require('../config');
var app = express()
var port = config.server.port || 5000;
var mongoDb = require('./lib/db');

mongoDb.connectToServer();

const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({'extended': 'true'}))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'),
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
});

require('./routes/routes')(app);

app.listen(process.env.PORT || port);
console.log('App listening on port ' + port)

module.exports = app;
