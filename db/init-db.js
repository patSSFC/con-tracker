var db = require('./db-config');
var csv = require('csv');
var fs = require('fs');
var readline = require('readline');

var lineReader = readline.createInterface({
  input: fs.createReadStream('legislators.csv'),
});

var cols = [
  {
    name: 'title',
    type: 'varchar(16)',
  },
  {
    name: 'firstname',
    type: 'varchar(48)',
  },
  {
    name: 'middlename',
    type: 'varchar(48)',
  },
  {
    name: 'lastname',
    type: 'varchar(48)',
  },
  {
    name: 'name_suffix',
    type: 'varchar(10)',
  },
  {
    name: 'nickname',
    type: 'varchar(48)',
  },
  {
    name: 'party',
    type: 'varchar(48)',
  },
  {
    name: 'state',
    type: 'varchar(28)',
  },
  {
    name: 'district',
    type: 'varchar(48)',
  },
  {
    name: 'in_office',
    type: 'integer',
  },
  {
    name: 'gender',
    type: 'varchar(2)',
  },
  {
    name: 'phone',
    type: 'varchar(28)',
  },
  {
    name: 'fax',
    type: 'varchar(28)',
  },
  {
    name: 'website',
    type: 'varchar(160)',
  },
  {
    name: 'webform',
    type: 'varchar(160)',
  },
  {
    name: 'congress_office',
    type: 'varchar(80)',
  },
  {
    name: 'bioguide_id',
    type: 'varchar(80)',
  },
  {
    name: 'votesmart_id',
    type: 'varchar(80)',
  },
  {
    name: 'fec_id',
    type: 'varchar(80)',
  },
  {
    name: 'govtrack_id',
    type: 'varchar(80)',
  },
  {
    name: 'crp_id',
    type: 'varchar(80)',
  },
  {
    name: 'twitter_id',
    type: 'varchar(80)',
  },
  {
    name: 'congresspedia_url',
    type: 'varchar(160)',
  },
  {
    name: 'youtube_url',
    type: 'varchar(160)',
  },
  {
    name: 'facebook_id',
    type: 'varchar(160)',
  },
  {
    name: 'official_rss',
    type: 'varchar(160)',
  },
  {
    name: 'senate_class',
    type: 'varchar(28)',
  },
  {
    name: 'birthdate',
    type: 'varchar(28)',
  },
];

var recordsToInsert = [];
var maketable = function (cols) {
  var createQuery = 'CREATE TABLE politicians (';
  cols.map(function (col) {
    createQuery += col.name + ' ' + col.type + ', ';
  });

  createQuery = createQuery.substr(0, createQuery.lastIndexOf(', '));
  createQuery += ')';
  return createQuery;
};

lineReader.on('line', function (line) {
  csv.parse(line, function (err, line) {
    recordsToInsert.push(line[0]);
  });
});

lineReader.on('close', function (err) {
  console.log(recordsToInsert);

  //map through stuff here
  //make sure to add single quotes around everything
});

// uncomment me to re-create the database
// db.connect().query(maketable(cols));

var insertRecord = '';
