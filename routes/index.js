import { getHomePage } from "../controllers/HomeController";
import { getAboutPage } from "../controllers/AboutController";
import { getContractPage } from "../controllers/ContractController";
import userController from "../controllers/UserController";

import auth from "../middlewares/auth";

const initWebRoutes = (app) => {
  app.use(auth.isLogin);
  app.get("/login", userController.getLoginPage);
  app.get("/logout", userController.logout);
  app.get("/", getHomePage);
  app.get("/about", getAboutPage);
  app.get("/contract", getContractPage);
  app.get("/user/viewAll", userController.getUserPage);
  app.get("/user/add", userController.getAddUserPage);
  app.post("/api/addUser", userController.addUser);
  app.post("/api/login", userController.login);
  // admin
  app.get(
    "/user/view/:username",
    auth.isAdmin,
    userController.getDetailUserPage
  );
  app.post("/api/delete", auth.isAdmin, userController.deleteUser);
  // user
  app.get("/user/edit/:username", auth.isBoth, userController.getEditUserPage);
  app.post("/api/editUser", auth.isBoth, userController.editUser);

  // api
  app.get("/api/getAllUser", userController.getAllUser);
  app.get("/api/getUserByUsername/:username", userController.getUserByUsername);
};
export default initWebRoutes;
