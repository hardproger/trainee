import { models } from '../models/index';
import Util from '../utils/utilities';
const util = new Util();

export default class User {
  // get all users
  getUsers = (req, res) => {
    models.User.findAll({order: [['id', 'ASC']]})
      .then(users => res.json(users));
  }
  // add or register new user
  insert = (req, res) => {
    req.body.imgUrl = req.body.sex === 'female' ? 'defaultWoman.jpg' : 'defaultMan.jpg';
    req.body.role = req.body.role && req.user && req.user.role === 'admin' ? req.body.role : 'user';
    req.body.birthday = req.body.year && req.body.day && req.body.month ? new Date(req.body.year, req.body.month, req.body.day) : null;
    // Promise.resolve().then(() => models.User.create(req.body))
    //   .then(regUser => util.handleResponse(res, 200, 'success', 'You have successfully registered!', regUser))
    //   .catch((err) => res.status(400).send(err));
    models.User
      .create(req.body)
      .then(regUser => util.handleResponse(res, 200, 'success', 'You have successfully registered!', regUser))
      .catch((err) => util.handleResponse(res, 409, 'error', 'The username already exists!', null, err.errors[0].message));
  }
  // delete user
  delete = (req, res) => {
    models.User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => util.handleResponse(res, 200, 'success', 'User was successfully deleted!'))
      .catch(() => util.handleResponse(res, 404, 'error', 'User is not found!'));

  }
  // find user
  find = (req, res) => {
    models.User.find({
      where: {
        id: req.params.id
      }
    }).then(user => res.json(user))
      .catch(() => util.handleResponse(res, 404, 'error', 'User is not found!'));
  }
  // update user
  update = (req, res) => {
    models.User.find({
      where: {id: req.params.id}
    })
      .then(user => {
        if (user.role === 'admin' && req.user.role === 'moderator') {
          util.handleResponse(res, 403, 'error', 'You haven\'t permission for do this!');
        }
        user.updateAttributes(req.body)
          .then(upUser => util.handleResponse(res, 200, 'success', 'The information was successfully changed!'))
          .catch(err => util.handleResponse(res, 409, 'error', 'The username has already exists!', null, err.errors[0].message));
      })
      .catch(err => util.handleResponse(res, 400, 'error', err));
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
  checkLogin = (req, res) => {
    if (req.isAuthenticated()) {
      util.handleResponse(res, 200, 'success', 'The user is authenticated!');
    } else {
      util.handleResponse(res, 403, 'error', 'The user is not authenticated!');
    }
  }
}
