import * as passport from 'passport';
import * as bcrypt from 'bcrypt';
const LocalStrategy = require('passport-local').Strategy;

const authenticationMiddleware = require('./middleware');

const saltRounds = 10;
const pass = 'secret';
const salt = bcrypt.genSaltSync(saltRounds);
const passHash = bcrypt.handSync(pass, salt);
