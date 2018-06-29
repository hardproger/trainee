var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');

passport.use(new LocalStrategy(function(username, password, done) {
  models.User
    .find({ where: { username: username } })
    .then((user) => {
      if(!user) {
        return done(null, false, { message: 'Unknown user ' + username });
      }
      models.User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if(isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid password' });
        }
      });
    })
    .catch((err) => {
      done(err);
    });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  models.User
    .find({ where: { id: userId } })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});
