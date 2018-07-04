import * as models from '../models/index';
import Util from '../utils/utilities';
const util = new Util();

export default class User {
  // get all users
  getUsers = (req, res) => {
    models.User.findAll({order: 'id'})
    .then(users => res.json(users));
  }
  // add or register new user
  insert = (req, res) => {
    models.User
      .create({
        username: req.body.username,
        role: 'user',
        password: req.body.password,
        imgUrl: 'default.png'
      })
      .then(regUser => util.handleResponse(res, 200, 'success', 'You have successfully registered!', regUser))
      .catch(() => util.handleResponse(res, 409, 'error', 'The username has already exists!'));
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
    }).then(user => util.handleResponse(res, 200, 'success', 'User was found', user))
      .catch(() => util.handleResponse(res, 404, 'error', 'User is not found!'));
  }
  // update user
  update = (req, res) => {
    if (req.user.role !== 'user') {
      models.User.find({
        where: {id: req.params.id}
      })
        .then(user => {
          user.updateAttributes({
            username: req.body.username || user.username,
            password: req.body.password || user.password,
            role: req.body.role || user.role,
            imgUrl: req.body.imgUrl || user.imgUrl
          })
            .then(upUser => util.handleResponse(res, 200, 'success', 'Successfully changed', upUser))
            .catch(err => util.handleResponse(res, 401, 'error', 'The username has already exists!'));
        })
        .catch(err => util.handleResponse(res, 400, 'error', err));
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
