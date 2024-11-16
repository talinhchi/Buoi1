import jwt from "jsonwebtoken";

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
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ error: true, message: "Access Denied" });
  }

  jwt.verify(
    token.split(" ")[1],
    process.env.ACCESS_TOKEN_SECRET,
    (err, user) => {
      if (err) {
        return res.status(403).json({ error: true, message: "Access Denied" });
      }
      req.user = user;
      next();
    }
  );
};

export default {
  globalVariables,
  isMineOrAdmin,
  verifyToken,
};
