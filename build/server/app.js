"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var http = require("http");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var models = require("./models");
var passportConfig = require('./utils/passport');
var routes_1 = require("./routes");
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
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
var server = http.createServer(app);
models
    .sequelize
    .sync()
    .then(function () {
    server.listen(app.get('port'), function () {
        routes_1.default(app);
        console.log('Express HTTP server listening on port ' + app.get('port'));
    });
})
    .catch(function (err) {
    throw err;
});
//# sourceMappingURL=app.js.map