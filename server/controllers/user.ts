import * as pg from 'pg';

const connectionString = {
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  password: 'user',
  port: 5432
};

export default class User {
  // get all users
  getUsers = (req, res) => {
    const results = [];
    const pool = new pg.Pool(connectionString);
    pool.connect((err, client, done) => {
      const query = client.query(new pg.Query('SELECT * FROM test ORDER BY id ASC'));
      query.on('row', (row) => {
        results.push(row);
      });
      query.on('end', () => {
        pool.end();
        done();
        return res.json(results);
      });
    });
  }
  // add new user
  insert = (req, res, next) => {
    const results = [];
    const pool = new pg.Pool(connectionString);
    pool.connect((err, client, done) => {
      client.query(new pg.Query('INSERT INTO test(name, age) values($1, $2)', [req.body.name, req.body.age]));
      const query = client.query(new pg.Query('SELECT * FROM test ORDER BY id ASC'));
      query.on('row', (row) => {
        results.push(row);
      });
      query.on('end', () => {
        done();
        return res.json(results);
      });
    });}
  // delete user
  delete = (req, res, next) => {
    const results = [];
    const pool = new pg.Pool(connectionString);
    pool.connect((err, client, done) => {
      client.query(new pg.Query('DELETE FROM test WHERE id=$1', [req.params.id]));
      const query = client.query(new pg.Query('SELECT * FROM test ORDER BY id ASC'));
      query.on('row', (row) => {
        results.push(row);
      });
      query.on('end', () => {
        done();
        return res.json(results);
      });
    });
  }
  // find user
  find = (req, res, next) => {
    const results = [];
    const pool = new pg.Pool(connectionString);
    pool.connect((err, client, done) => {
      const query = client.query(new pg.Query('SELECT * FROM test WHERE id=$1', [req.params.id]));
      query.on('row', (row) => {
        results.push(row);
      });
      query.on('end', () => {
        pool.end();
        done();
        return res.json(results);
      });
    });
  }
  // update user
  update = (req, res, next) => {
    const results = [];
    const pool = new pg.Pool(connectionString);
    pool.connect((err, client, done) => {
      client.query(new pg.Query('UPDATE test SET name=$1, age=$2 WHERE id=$3', [req.body.name, req.body.age, req.params.id]));
      const query = client.query(new pg.Query('SELECT * FROM test ORDER BY id ASC'));
      query.on('row', (row) => {
        results.push(row);
      });
      query.on('end', () => {
        done();
        return res.json(results);
      });
    });
  }
}
