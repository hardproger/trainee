module.exports = require('knex')({
  client: 'pg',
  connection: 'postgres://postgres:user@localhost:5432/datingchile_db'
});
