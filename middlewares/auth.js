const globalVariables = (req, res, next) => {
  res.locals.userLogin = null;
  if (req.session.isAuth) {
    res.locals.userLogin = req.session.userLogin;
  }
  next();
};
const isMineOrAdmin = (req, res, next) => {
  if (req.session.isAuth) {
    if (req.session.userLogin.username === req.params.username) {
      next();
      return;
    }
    if (req.session.role === 0) {
      next();
      return;
    }
  }
  res.redirect("/");
};

export default {
  globalVariables,
  isMineOrAdmin,
};
