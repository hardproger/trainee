import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as pg from 'pg';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '../public')));
const server = http.createServer(app);
// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json())

server.listen(app.get('port'), () => {
  console.log('Express HTTP server listening on port ' + app.get('port') );
});

const router = express.Router();

const connectionString = {
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  password: 'user',
  port: 5432
};

const pool = new pg.Pool(connectionString);

app.get('/api/users', (req, res, next) => {
  const results = [];
  pool.connect((err, client, done) => {
    const query = client.query(new pg.Query('SELECT * FROM test'));
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      pool.end();
      done();
      return res.json(results);
    });
  });
});
