import * as multer from 'multer';

import { models } from '../models/index';
import { util } from '../utils/utilities';
import { config } from '../config/config';

class User {
  // get all users
  getUsers = (req, res) => {
    models.User.getUsers()
      .then(users => res.json(users));
  }
  // add or register new user
  addUser = (req, res) => {
    req.body.imgUrl = req.body.sex === 'female' ? 'defaultWoman.jpg' : 'defaultMan.jpg';
    req.body.role = req.body.role && req.user && req.user.role === 'admin' ? req.body.role : 'user';
    req.body.birthday = req.body.year && req.body.day && req.body.month ?
      new Date(req.body.year, req.body.month, req.body.day) : new Date();
    models.User.addUser(req)
      .spread((result, created) => {
        if (created) {
          util.handleResponse(res, 200, 'success', 'You have successfully registered!', result);
        } else {
          util.handleResponse(res, 409, 'error', 'The email/username already exists!', null);
        }
      })
      .catch(err => {
        console.log(err);
        util.handleResponse(res, 500, 'error', 'Something went wrong :(', null, err);
      });
  }
  // delete user
  deleteUser = (req, res) => {
    models.User.deleteUser(req.params.id)
      .then(() => util.handleResponse(res, 200, 'success', 'User was successfully deleted!'))
      .catch(() => util.handleResponse(res, 404, 'error', 'User is not found!'));
  }
  // find user
  findUser = (req, res) => {
    models.User.findUser(req.params.id)
      .then(user => res.json(user))
      .catch(() => util.handleResponse(res, 404, 'error', 'User is not found!'));
  }
  // update user
  updateUser = (req, res) => {
    models.User.findUser(req.params.id)
      .then(user => {
        if ((req.user.role === 'user' || req.user.role === 'moderator') && user.id !== req.user.id) {
          util.handleResponse(res, 403, 'error', 'You haven\'t permission for do this!');
          return;
        }
        user.updateAttributes(req.body)
          .then(() => util.handleResponse(res, 200, 'success', 'The information was successfully changed!'))
          .catch(err => util.handleResponse(res, 409, 'error', 'The username has already exists!', null, err.errors[0].message));
      })
      .catch(err => util.handleResponse(res, 500, 'error', err));
  }
  login = (req, res) => {
    const user = {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
      token: req.user.token
    };
    util.handleResponse(res, 200, 'success', 'You have successfully logged in!', user);
  }
  logout = (req, res) => {
    req.logout();
    util.handleResponse(res, 200, 'success', 'You have successfully logged off');
  }
  uploadPhoto = (req, res) => {
    const upload = multer(config.getMulterConfig()).single('file');
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      models.User.findUser(req.user.id)
        .then(user => {
          user.updateAttributes(req.body)
            .then(upUser => {
              res.send(req.file.filename);
              util.handleResponse(res, 200, 'success', 'Photo was successfully changed!', upUser);
            })
            .catch(error => util.handleResponse(res, 500, 'error', 'Error', null, error));
        });
    });
  }
}

export const userCtrl = new User();
