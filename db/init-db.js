var db = require('./db-config');
var csv = require('csv');

var cols = [
  {
    name:'title',
    type: 'varchar(16)',
  },
  {
    name: 'firstName',
    type: 'varchar(48)',
  },
  {
    name: 'middleName',
    type: 'varchar(48)',
  },
  {
    name: 'lastName',
    type: 'varhcar(48)',
  },
  {
    name: 'nameSuffix',
    type: 'varchar(10)',
  },
  {
    name: 'nickName',
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
    name: 'inOffice',
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
    name: 'congressOffice',
    type: 'varchar(80)',
  },
  {
    name: 'bioguideID',
    type: 'varchar(80)',
  },
  {
    name: 'votesmartID',
    type: 'varchar(80)',
  },
  {
    name: 'fecID',
    type: 'varchar(80)',
  },
  {
    name: 'govtrackID',
    type: 'varchar(80)',
  },
  {
    name: 'crpID',
    type: 'varchar(80)',
  },
  {
    name: 'twitterID',
    type: 'varchar(80)',
  },
  {
    name: 'congresspediaURL',
    type: 'varchar(160)',
  },
  {
    name: 'youtubeURL',
    type: 'varchar(160)',
  },
  {
    name: 'facebookID',
    type: 'varchar(160)',
  },
  {
    name: 'officialRSS',
    type: 'varchar(160)',
  },
  {
    name: 'senateClass',
    type: 'varchar(28)',
  },
  {
    name: 'birthdate',
    type: 'varchar(28)',
  },
];

var create_query = 'CREATE TABLE legislators';
var insert_record = '';
