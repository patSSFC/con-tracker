var db = require('./db-config');
var csv = require('csv');
var fs = require('fs');
var readline = require('readline');

var dbInit = {
  cols: [
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
      type: 'varchar(48)',
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
      type: 'varchar(48)',
    },
    {
      name: 'gender',
      type: 'varchar(20)',
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
    {
      name: 'oc_email',
      type: 'varchar(80)',
    },
  ],

  recordsToInsert: [],
  insertQueries: [],

  maketable: function (cols, table) {
    var createQuery = 'CREATE TABLE ' + table + ' (';
    cols.map(function (col) {
      createQuery += col.name + ' ' + col.type + ', ';
    });

    createQuery = createQuery.substr(0, createQuery.lastIndexOf(', '));
    createQuery += ')';
    return createQuery;
  },

  dropTable: function (table) {
    db.connect().query('DROP TABLE ' + table);
  },

  createTable: function () {
    db.connect().query(dbInit.maketable(dbInit.cols), 'politicians');
  },

  loopThroughRecords: function (insertQueries) {
    insertQueries.map(function (query) {
      db.connect().query(query);
    });
  },

  initTableWithRecords: function (csvFile) {
    var lineReader = readline.createInterface({
      input: fs.createReadStream(csvFile),
    });

    lineReader.on('line', function (line) {
      csv.parse(line, function (err, line) {
        dbInit.recordsToInsert.push(line[0]);
      });
    });

    lineReader.on('close', function (err) {
      insertQueries = dbInit.recordsToInsert.map(function (record) {
        var modRec = record.map(function (field) {
          return "'" + field + "'";
        });

        return 'INSERT INTO politicians VALUES (' + modRec.join(', ') + ')';
      });

      dbInit.loopThroughRecords(insertQueries);
    });
  },
};
