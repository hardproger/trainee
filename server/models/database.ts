import * as pg from 'pg';

const connectionString = {
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  password: 'user',
  port: 5432
};

const pool = new pg.Pool(connectionString);

pool.connect(function(err, client, done) {
  const query = client.query(new pg.Query('SELECT * from test'));
  query.on('row', (row) => {
    console.log(row);
  });
  query.on('end', (res) => {
    console.log('ending');
    pool.end();
  });
  query.on('error', (res) => {
    console.log(res);
  });
  done();
});

