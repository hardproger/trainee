import * as path from 'path';
import * as passport from 'passport';

import { userCtrl } from './controllers/user';
import { photoCtrl } from './controllers/photo';
import { util } from './utils/utilities';

export default function setRoutes(app) {
  // user endpoints
  app.get('/api/users', util.checkAuth, userCtrl.getUsers);
  app.post('/api/user', userCtrl.addUser);
  app.delete('/api/user/:id', util.checkAuth, util.adminGuard, userCtrl.deleteUser);
  app.get('/api/user/:id', util.checkAuth, userCtrl.findUser);
  app.put('/api/user/:id', util.checkAuth, userCtrl.updateUser);
  app.post('/api/login', passport.authenticate('local'), userCtrl.login);
  app.get('/api/logout', util.checkAuth, userCtrl.logout);
  app.get('/api/isauthenticated', util.checkAuth);
  // photo endpoints
  app.get('/api/photos/:userId', util.checkAuth, photoCtrl.getPhotos);
  app.post('/api/photo', util.checkAuth, photoCtrl.addPhoto);
  app.put('/api/photo/:id', util.checkAuth, util.checkUserRole, photoCtrl.updatePhoto);
  app.delete('/api/photo/:id', util.checkAuth, util.checkUserRole, photoCtrl.deletePhoto);
  app.get('/api/photo/:id', util.checkAuth, photoCtrl.findPhoto);
  // other
  app.post('/api/upload', util.checkAuth, userCtrl.uploadPhoto);
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}
