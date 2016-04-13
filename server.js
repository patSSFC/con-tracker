var express = require('express');
var db = require('./db/db-config.js');
var app = express();

// db.connect(db.getPolitician);
var connection = db.connect();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Server is listening on port %s', server.address().port);
});
