import User from './controllers/user';

export default function setRoutes(app) {
  const userCtrl = new User();
  app.get('/api/users', userCtrl.getUsers);
  app.post('/api/user', userCtrl.insert);
  app.delete('/api/user/:id', userCtrl.delete);
  app.get('/api/user/:id', userCtrl.find);
  app.put('/api/user/:id', userCtrl.update);
}

