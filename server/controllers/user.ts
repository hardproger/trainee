import * as models from '../models/index';

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
        res.json(user)
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
}
