import * as express from 'express';
import * as pg from 'pg';
import * as path from 'path';

const router = express.Router();

const connectionString = {
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  password: 'user',
  port: 5432
};

router.get('/api/users', (req, res, next) => {
  const results = [];
  // const data = {name: req.body.text, age: 18};
  pg.connect(connectionString, (err, client, done) => {
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query('SELECT * FROM test');
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});
