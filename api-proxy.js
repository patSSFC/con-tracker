var requestProxy = require('express-request-proxy');

var apiProxy = function () {
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

  var proxySunlightFinance = function (req, res) {
    req.query.apikey = process.env.SUNLIGHT_API_KEY;
    (requestProxy({
      url: 'http://realtime.influenceexplorer.com/api//' + req.params[0],
    }))(req, res);
  };

  var proxyOpenSecrets = function (req, res) {
    req.query.apikey = process.env.OPENSECRETS_API_KEY;
    (requestProxy({
      url: 'http://www.opensecrets.org/api/',
    }))(req, res);
  };

  var proxyNewYorkTimes = function (req, res) {
    req.query['api-key'] = process.env.NYT_API_KEY;
    (requestProxy({
      url: 'http://api.nytimes.com/svc/politics/v3/us/legislative/congress/members/' + req.params[0],
    }))(req, res);
  };

  return {
    proxySunlightFinance: proxySunlightFinance,
    proxySunlightStates: proxySunlightStates,
    proxySunlightCongress: proxySunlightCongress,
    proxyOpenSecrets: proxyOpenSecrets,
    proxyNewYorkTimes: proxyNewYorkTimes,
  };
};

module.exports = apiProxy();
