export default class Util {
  handleResponse = (res, code, status, msg, user = null) => {
    res.status(code).json({
      status: status,
      message: msg,
      user: user
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
}
