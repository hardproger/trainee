export default this.handleResponse = (res, code, status, msg, user = null) => {
  res.status(code).json({
    status: status,
    message: msg,
    user: user
  });
};
