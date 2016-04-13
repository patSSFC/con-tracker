var pg = require('pg');
pg.defaults.ssl = true;

var db = function () {
  var connect = function () {
    return function (query) {
      pg.connect(process.env.DATABASE_URL, function (err, client) {
        if (err) {return err;}

        console.log('connected');
        console.log('running query ' + query);
      });
    };
  };

  return {
    connect: connect,
  };
};

module.exports = db();
