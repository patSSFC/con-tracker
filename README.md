# CONTRACKER

## Interacting with cache database
The cache database holds bulk data regarding politicians. This includes common bio information as well as ids for common databases.

The database can be queried at the ```/database/``` route. By default all columns and records will be returned.
An ```array``` of rows can be accessed at the ```req.data.rows``` property.

Future support is planned for filtering columns and rows.

Everyone will need to set their ```env.process.DATABASE_URL``` to the heroku config var.
