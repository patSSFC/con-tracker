var express = require('express');
var db = require('./db/db-config.js');
var app = express();

var queryDB = function (req, res) {
  var table = 'politicians';
  var q = req.query.query === undefined ? '*' : req.query.query;
  var query = 'SELECT ' + q +  ' FROM ' + table;

  db.connect().query(query, function (err, data) {
    if (err) {
      console.log('ERROR:: ' + JSON.stringify(err));
      res.sendStatus(500);
    }

    res.status(200).send(data);
  });
};

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/database/', queryDB);

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Server is listening on port %s', server.address().port);
});
