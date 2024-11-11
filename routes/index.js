import { getHomePage } from "../controllers/HomeController";
import { getAboutPage } from "../controllers/AboutController";
import { getContractPage } from "../controllers/ContractController";
import userController from "../controllers/UserController";

import auth from "../middlewares/auth";

const initWebRoutes = (app) => {
  app.use(auth.globalVariables);
  app.get("/login", userController.getLoginPage);
  app.get("/logout", userController.logout);
  app.get("/", getHomePage);
  app.get("/about", getAboutPage);
  app.get("/contract", getContractPage);
  app.get("/user/viewAll", userController.getUserPage);
  app.get("/user/add", userController.getAddUserPage);
  // sequelize
  app.post("/api/addUserSequelize", userController.addUserSequelize);
  app.post("/api/addUser", userController.addUser);
  app.post("/api/login", userController.login);
  // phân quyền
  app.get(
    "/user/view/:username",
    auth.isMineOrAdmin,
    userController.getDetailUserPage
  );
  // delete user viết bằng sequelize
  app.post(
    "/api/deleteSequelize/:username",
    auth.isMineOrAdmin,
    userController.deleteUserSequelize
  );
  app.post(
    "/api/delete/:username",
    auth.isMineOrAdmin,
    userController.deleteUser
  );
  app.get(
    "/user/edit/:username",
    auth.isMineOrAdmin,
    userController.getEditUserPage
  );
  app.post(
    "/api/editUser/:username",
    auth.isMineOrAdmin,
    userController.editUser
  );

  // api
  app.get("/api/getAllUser", userController.getAllUser);
  app.get("/api/getUserByUsername/:username", userController.getUserByUsername);
};
export default initWebRoutes;
