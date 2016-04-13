var pg = require('pg');
pg.defaults.ssl = true;

var db = function () {
  var connect = function () {
    return {
      query: function (query, callback) {
        pg.connect(process.env.DATABASE_URL, function (err, client) {
          if (err) {return err;}

          console.log('connected');
          console.log('running query ' + query);
          client.query(query, callback);
        });
      },
    };
  };

  return {
    connect: connect,
  };
};

module.exports = db();
