var express = require('express');
var db = require('./db/db-config.js');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/database/', function (req, res) {
  var table = 'politicians';
  var q = req.query.query === undefined ? '*' : req.query.query;
  console.log(req.query.query);
  var query = 'SELECT ' + q +  ' FROM ' + table;

  db.connect().query(query, function (err, data) {
    if (err) {
      console.log(JSON.stringify(err));
      res.sendStatus(500);
    }

    data;
    res.status(200).send(data);
  });

});

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Server is listening on port %s', server.address().port);
});
