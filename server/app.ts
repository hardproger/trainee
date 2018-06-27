import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as session from 'express-session';

import setRoutes from './routes';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '../public')));
const server = http.createServer(app);
// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

server.listen(app.get('port'), () => {
  setRoutes(app);
  console.log('Express HTTP server listening on port ' + app.get('port') );
});
