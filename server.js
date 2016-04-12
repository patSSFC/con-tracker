var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Server is listening on port %s', server.address().port);
});
