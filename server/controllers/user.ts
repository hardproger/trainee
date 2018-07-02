import * as models from '../models/index';
import handleResponse from '../utils/handleResponse';

export default class User {
  // get all users
  getUsers = (req, res) => {
    models.User.findAll({
      order: 'id'
    })
    .then(users => res.json(users));
  }
  // add or register new user
  insert = (req, res) => {
    models.User.find({
      where: {username: req.body.username}
    })
    .then((user) => {
      if (!user) {
        models.User
          .create({
            username: req.body.username,
            role: 'user',
            password: req.body.password,
            imgUrl: 'default.png'
          })
          .then((regUser) => {
            handleResponse(res, 200, 'success', 'You have successfully registered!', regUser);
          });
      } else {
        handleResponse(res, 401, 'error', 'The username has already exists.');
      }
    });
  }
  // delete user
  delete = (req, res) => {
    models.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(user => {
        res.json(user);
      });
  }
  // find user
  find = (req, res) => {
    models.User.find({
      where: {
        id: req.params.id
      }
    }).then(user => res.json(user));
  }
  // update user
  update = (req, res) => {
    models.User.find({
      where: {username: req.body.username}
    })
    .then(user => {
      if (!user) {
        models.User.find({
          where: {
            id: req.params.id
          }
        }).then(user => {
          if (user) {
            user.updateAttributes({
              username: req.body.username,
              role: req.body.role,
              password: req.body.password
            }).then(upUser => res.json(upUser));
          }
        });
      } else {
        handleResponse(res, 401, 'error', 'The username has already exists!');
      }
    });
  }
  login = (req, res) => {
    const user = {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role,
      token: req.user.token
    };
    handleResponse(res, 200, 'success', 'You have successfully logged in!', user);
  }
  logout = (req, res) => {
    req.logout();
    handleResponse(res, 200, 'success', 'You have successfully logged off');
  }
}
