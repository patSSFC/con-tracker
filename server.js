var express = require('express');
var db = require('./db/db-config.js');
var requestProxy = require('express-request-proxy');
var app = express();

var buildQueryString;

var proxySunlightCongress = function (req, res) {
  console.log('Routing for sunglight api', req.params[0]);
  (requestProxy({
    url: 'https://congress.api.sunlightfoundation.com/' + req.params[0],
    headers: { 'X-APIKEY': process.env.SUNLIGHT_API_KEY },
  }))(req, res);
};

var proxySunlightStates = function (req, res) {
  req.query.apikey = process.env.SUNLIGHT_API_KEY;
  (requestProxy({
    url: 'http://openstates.org/api/v1/' + req.params[0],
  }))(req, res);
};

var proxySunglightFinance = function (req, res) {
  req.query.apikey = process.env.SUNLIGHT_API_KEY;
  (requestProxy({
    url: 'http://realtime.influenceexplorer.com/api/' + req.params[0],
  }))(req, res);
};

var proxyOpenSecrets = function (req, res) {
  req.query.apikey = process.env.OPENSECRETS_API_KEY;
  (requestProxy({
    url: 'http://www.opensecrets.org/api/',
  }))(req, res);
};

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

app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/database/', queryDB);
app.get('/sunlight_congress/*', proxySunlightCongress);
app.get('/sunlight_states/*', proxySunlightStates);
app.get('/sunlight_finance/*', proxySunglightFinance);
app.get('/opensecrets/*', proxyOpenSecrets);

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Server is listening on port %s', server.address().port);
});
