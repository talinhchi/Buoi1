const isLogin = (req, res, next) => {
  res.locals.userLogin = null;
  if (req.session.isAuth) {
    res.locals.userLogin = req.session.userLogin;
  }
  next();
};
const isAdmin = (req, res, next) => {
  if (req.session.isAuth && req.session.user.role === 0) {
    return next();
  }
  res.redirect("/");
};
const isUser = (req, res, next) => {
  if (req.session.isAuth && req.session.user.role === 1) {
    if (req.params.username === req.session.user.username) {
      return next();
    }
  }
  res.redirect("/");
};
const isBoth = (req, res, next) => {
  if (req.session.isAuth && req.session.user.role === 1) {
    if (req.params.username === req.session.user.username) {
      return next();
    }
  }
  if (req.session.isAuth && req.session.user.role === 0) {
    return next();
  }
  res.redirect("/");
};

export default { isLogin, isAdmin, isUser, isBoth };
