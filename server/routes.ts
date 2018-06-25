import User from './controllers/user';

export default function setRoutes(app, passport) {
  const userCtrl = new User();
  app.get('/api/users', userCtrl.getUsers);
  app.post('/api/user', userCtrl.insert);
  app.delete('/api/user/:id', userCtrl.delete);
  app.get('/api/user/:id', userCtrl.find);
  app.put('/api/user/:id', userCtrl.update);
  app.post('/api/login', passport.authenticate('local-login'), (req, res) => {
    res.json(req.user);
  });
  app.post('/api/logout', (req, res) => {
    req.logOut();
    res.send(200);
  });
  app.get('/api/loggedin', (req, res) => {
    res.send(req.isAuthenticated() ? req.user : '0');
  });
}

