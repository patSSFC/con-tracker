var express = require('express');
var db = require('./db/db-config.js');
var app = express();

var connection = db.connect();
var create_table = 'CREATE TABLE legislators (first_name varchar(160), last_name varchar(160))';
var insert = "INSERT INTO legislators VALUES ('taylor', 'wirtz')";

// connection.query(query, null);
connection.query(insert);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Server is listening on port %s', server.address().port);
});
