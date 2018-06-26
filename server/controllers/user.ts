import * as pg from 'pg';
const knex = require('../db/connection');
const passport = require('../auth/local');
const authHelpers = require('../auth/_helpers');

const connectionString = {
  user: 'postgres',
  host: 'localhost',
  database: 'datingchile_db',
  password: 'user',
  port: 5432
};

export default class User {
  // get all users
  getUsers = (req, res) => {
    const results = [];
    const pool = new pg.Pool(connectionString);
    pool.connect((err, client, done) => {
      const query = client.query(new pg.Query('SELECT * FROM users ORDER BY id ASC'));
      query.on('row', (row) => {
        results.push(row);
      });
      query.on('end', () => {
        pool.end();
        done();
        return res.json(results);
      });
    });
    // knex('users')
    //   .select()
    //   .then(rows => res.json(rows));
  }
  // add new user
  insert = (req, res, next) => {
    const results = [];
    const pool = new pg.Pool(connectionString);
    pool.connect((err, client, done) => {
      client.query(new pg.Query('INSERT INTO users(username, role, password) values($1, $2, $3)'
        , [req.body.username, req.body.role, req.body.password]));
      const query = client.query(new pg.Query('SELECT * FROM users ORDER BY id ASC'));
      query.on('row', (row) => {
        results.push(row);
      });
      query.on('end', () => {
        done();
        return res.json(results);
      });
    });
  }
  // delete user
  delete = (req, res, next) => {
    const results = [];
    const pool = new pg.Pool(connectionString);
    pool.connect((err, client, done) => {
      client.query(new pg.Query('DELETE FROM users WHERE id=$1', [req.params.id]));
      const query = client.query(new pg.Query('SELECT * FROM users ORDER BY id ASC'));
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
      const query = client.query(new pg.Query('SELECT * FROM users WHERE id=$1', [req.params.id]));
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
      client.query(new pg.Query('UPDATE users SET username=$1, role=$2, password=$3 WHERE id=$4'
        , [req.body.username, req.body.role, req.body.password, req.params.id]));
      const query = client.query(new pg.Query('SELECT * FROM users ORDER BY id ASC'));
      query.on('row', (row) => {
        results.push(row);
      });
      query.on('end', () => {
        done();
        return res.json(results);
      });
    });
  }
  handleResponse = (res, code, statusMsg) => {
    res.status(code).json({status: statusMsg});
  }
  register = (req, res, next) => {
    return authHelpers
      .createUser(req, res)
      .then((response) => {
        passport.authenticate('local', (err, user, info) => {
          if (user) { this.handleResponse(res, 200, 'success'); }
        })(req, res, next);
      })
      .catch((err) => {  this.handleResponse(res, 500, 'error'); });
  }
  login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { this.handleResponse(res, 500, 'error'); }
      if (!user) { this.handleResponse(res, 404, 'not found'); }
      if (user) {
        req.logIn(user, error => {
          if (error) { this.handleResponse(res, 500, 'error'); }
          this.handleResponse(res, 200, 'success');
        });
      }
    })(req, res, next);
  }
}
