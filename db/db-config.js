var pg = require('pg');
pg.defaults.ssl = true;

var db = function () {
  var connect = function () {
    return {
      query: function (query, callback) {
        pg.connect(process.env.DATABASE_URL, function (err, client, done) {
          if (err) {return err;}

          console.log('connected');
          console.log('running query ' + query);
          client.query(query, function (err, data) {
            if (callback) {callback(err, data);}

            done();
          });
        });
      },
    };
  };

  return {
    connect: connect,
  };
};

module.exports = db();
