import * as models from '../models/index';
const passport = require('passport');

export default class User {
  // get all users
  getUsers = (req, res) => {
    models.User.findAll({})
      .then(users => res.json(users));
  }
  // add new user
  insert = (req, res) => {
    models.User.create({
      username: req.body.username,
      role: req.body.role || 'user',
      password: req.body.password
    }).then(user => res.json(user));
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
  update = (req, res, next) => {
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
  }
  register = (req, res) => {
    models.User.find({
      where: { username: req.body.username }
    })
      .then((user) => {
        if (!user) {
          models.User
            .create({
              username: req.body.username,
              role: 'user',
              password: req.body.password
            })
            .then(regUser => {
                res.json({
                  status: 'success',
                  message: 'You have successfully registered!',
                  user: regUser
                });
          });
        } else {
          res.json({
            status: 'error',
            message: 'The username already exists. Please take another!'
          });
        }
      });
  }
  login = (req, res) => {
    res.json({
      status: 'success',
      message: 'You have successfully logged in!',
      user: req.user
    });
  }
  logout = (req, res) => {
    req.logout();
    res.json({
      status: 'success',
      message: 'You have successfully logged off!'
    });
  }
}
