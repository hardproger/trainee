import User from './controllers/user';
import * as passport from 'passport';
import handleResponse from './utils/handleResponse';

export default function setRoutes(app) {
  const userCtrl = new User();
  app.get('/api/users', userCtrl.getUsers);
  app.post('/api/user', userCtrl.insert);
  app.delete('/api/user/:id', userCtrl.delete);
  app.get('/api/user/:id', userCtrl.find);
  app.put('/api/user/:id', userCtrl.update);
  app.post('/api/login', passport.authenticate('local'), userCtrl.login);
  app.get('/api/logout', checkAuth, userCtrl.logout);
}

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    handleResponse(res, 401, 'error', 'Not authenticated');
  }
}

