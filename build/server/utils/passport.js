"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var passportLocal = require("passport-local");
var index_1 = require("../models/index");
var jwt = require("jsonwebtoken");
var LocalStrategy = passportLocal.Strategy;
passport.use(new LocalStrategy(function (email, password, done) {
    index_1.models.User
        .find({
        where: { email: email }
    })
        .then(function (user) {
        if (!user) {
            return done(null, false);
        }
        index_1.models.User.comparePassword(password, user.password, function (err, isMatch) {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                var token = jwt.sign({ user: user }, 'secretToken');
                user.token = token;
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    })
        .catch(function (err) {
        done(err);
    });
}));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (userId, done) {
    index_1.models.User
        .find({
        where: { id: userId }
    })
        .then(function (user) {
        done(null, user);
    })
        .catch(function (err) {
        done(err, null);
    });
});
//# sourceMappingURL=passport.js.map