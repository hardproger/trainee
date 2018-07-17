import { models } from '../models/index';

export default class Util {
  handleResponse = (res, code, status, msg, user = null, err = null) => {
    res.status(code).json({
      status: status,
      message: msg,
      user: user,
      error: err
    });
  }
  checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      this.handleResponse(res, 403, 'error', 'Not authenticated');
    }
  }
  adminGuard = (req, res, next) => {
    if (req.user.role === 'admin') {
      next();
    } else {
      this.handleResponse(res, 403, 'error', 'You don\'t have permission!');
    }
  }
  checkUser = (req, res, next) => {
    models.Photo.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(user => {
        if (user.userId === req.user.id) {
          next();
        } else {
          this.handleResponse(res, 403, 'error', 'You don\'t have permission!');
        }
      })
      .catch(err => {
        this.handleResponse(res, 500, 'error', 'Something went wrong :(');
        console.log(err);
      });
  }
}
