import * as models from '../models/index';
import Util from '../utils/utilities';
const util = new Util();

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
    let role;
    if (req.user !== undefined && req.user.role === 'admin') {
      role = req.body.role;
    }
    models.User.find({
      where: {username: req.body.username}
    })
    .then((user) => {
      if (!user) {
        models.User
          .create({
            username: req.body.username,
            role: role || 'user',
            password: req.body.password,
            imgUrl: 'default.png'
          })
          .then((regUser) => {
            util.handleResponse(res, 200, 'success', 'You have successfully registered!', regUser);
          });
      } else {
        util.handleResponse(res, 409, 'error', 'The username has already exists.');
      }
    });
  }
  // delete user
  delete = (req, res) => {
    models.User.destroy({
      where: {
        id: req.params.id
      }
    }).then((user) => {
      if (!user) {
        util.handleResponse(res, 404, 'error', 'User is not found!');
      } else {
        util.handleResponse(res, 200, 'error', 'User was successfully deleted!', user);
      }
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
    if (req.user.role !== 'user') {
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
            util.handleResponse(res, 409, 'error', 'The username has already exists!');
          }
        });
    } else {
      util.handleResponse(res, 403, 'error', 'You haven\'t permission for do this!');
    }
  }
  login = (req, res) => {
    const user = {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role,
      token: req.user.token
    };
    util.handleResponse(res, 200, 'success', 'You have successfully logged in!', user);
  }
  logout = (req, res) => {
    req.logout();
    util.handleResponse(res, 200, 'success', 'You have successfully logged off');
  }
}
