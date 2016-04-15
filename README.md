# CONTRACKER

## Interacting with cache database
The cache database holds bulk data regarding politicians. This includes common bio information as well as ids for common databases.

The database can be queried at the ```/database/``` route. By default all columns and records will be returned.
An ```array``` of rows can be accessed at the ```req.data.rows``` property.

Future support is planned for filtering columns and rows.

Everyone will need to set their ```env.process.DATABASE_URL``` to the heroku config var.

## Interacting with APIs
Proxies have been set up for the major APIs used by the Sunlight Foundation and Open Secets.
### OpenSecrets APIs
The OpenSecret API is accessed via `GET` requests to the `/opensecrets/` route.
Query parameters should be sent to this route per the OpenSecrets API documentation.

**DO NOT** include the `apikey` parameter. The proxy will add this for you.

**EXAMPLE**:

```http://www.opensecrets.org/api/?method=getLegislators&output=json``` becomes

```/opensecrets/?method=getLegislators&output=json```

## Sunlight Foundation API
The Sunlight Foundation API is accessed via `GET` requests to one of the following routes:

`congress-sunlight` for the Congress API
`congress-states` for the States API
