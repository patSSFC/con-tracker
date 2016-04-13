var pg = require('pg');
pg.defaults.ssl = true;

var connect = function (callback) {
  //pg.connect requires a fn callback(err, client)
  pg.connect(process.env.DATABASE_URL, callback);
};

//we will need to build functions to query this database.
//all querys should start with a call to connect
var getPolitican = function (callback) {
  //call connect() here
};

exports.connect = connect;
