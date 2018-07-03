import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as models from '../models/index';
import * as jwt from 'jsonwebtoken';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy((username, password, done) => {
  models.User
    .find({
      where: { username: username }
    })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      models.User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          const token = jwt.sign({user: user}, 'secretToken');
          user.token = token;
          return done(null, user);
        } else {
          return done(null, false);
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
    .find({
      where: { id: userId }
    })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});
