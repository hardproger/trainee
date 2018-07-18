import User from './controllers/user';
import Photo from './controllers/photo';
import * as passport from 'passport';
import Util from './utils/utilities';

export default function setRoutes(app) {
  const userCtrl = new User();
  const photoCtrl = new Photo();
  const util = new Util();
  // user endpoints
  app.get('/api/users', util.checkAuth, userCtrl.getUsers);
  app.post('/api/user', userCtrl.insert);
  app.delete('/api/user/:id', util.checkAuth, util.adminGuard, userCtrl.delete);
  app.get('/api/user/:id', util.checkAuth, userCtrl.find);
  app.put('/api/user/:id', util.checkAuth, userCtrl.update);
  app.post('/api/login', passport.authenticate('local'), userCtrl.login);
  app.get('/api/logout', util.checkAuth, userCtrl.logout);
  app.get('/api/isauthenticated', userCtrl.checkLogin);
  // photo endpoints
  app.get('/api/photos/:userId', util.checkAuth, photoCtrl.getPhotos);
  app.post('/api/photo', util.checkAuth, photoCtrl.addPhoto);
  app.put('/api/photo/:id', util.checkAuth, util.checkUserRole, photoCtrl.updatePhoto);
  app.delete('/api/photo/:id', util.checkAuth, util.checkUserRole, photoCtrl.deletePhoto);
  app.get('/api/photo/:id', util.checkAuth, photoCtrl.findPhoto);
}
