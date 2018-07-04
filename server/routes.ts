import User from './controllers/user';
import * as passport from 'passport';
import Util from './utils/utilities';

export default function setRoutes(app) {
  const userCtrl = new User();
  const util = new Util();
  app.get('/api/users', userCtrl.getUsers);
  app.post('/api/user', userCtrl.insert);
  app.delete('/api/user/:id', util.checkAuth, util.adminGuard, userCtrl.delete);
  app.get('/api/user/:id', util.checkAuth, userCtrl.find);
  app.put('/api/user/:id', util.checkAuth, userCtrl.update);
  app.post('/api/login', passport.authenticate('local'), userCtrl.login);
  app.get('/api/logout', userCtrl.logout);
}
