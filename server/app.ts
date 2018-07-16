import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as session from 'express-session';
import * as models from './models';
import * as multer from 'multer';

import Util from './utils/utilities';
const util = new Util();

const passportConfig = require('./utils/passport');

import setRoutes from './routes';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '../client')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

const multerConfig = {

  storage: multer.diskStorage({
    destination: (req, file, next) => {
      next(null, 'client/assets/userImg');
    },

    filename: function(req, file, next) {
      const ext = file.mimetype.split('/')[1];
      next(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
  }),

  fileFilter: function(req, file, next) {
    if (!file) {
      next();
    }
    const image = file.mimetype.startsWith('image/');
    if (image) {
      console.log('photo uploaded');
      next(null, true);
    } else {
      console.log('file not supported');

      return next();
    }
  }
};

app.post('/upload', multer(multerConfig).single('file'), function(req, res) {
  res.send(req.file.filename);
});

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
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const server = http.createServer(app);

models
  .sequelize
  .sync()
  .then(() => {
    server.listen(app.get('port'), () => {
      setRoutes(app);
      console.log('Express HTTP server listening on port ' + app.get('port') );
    });
})
.catch((err) => {
  throw err;
});
