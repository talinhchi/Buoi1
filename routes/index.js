import { getHomePage } from "../controllers/HomeController";
import { getAboutPage } from "../controllers/AboutController";
import { getContractPage } from "../controllers/ContractController";
import userController from "../controllers/UserController";
import apiController from "../controllers/ApiController";

import auth from "../middlewares/auth";
import upload from "../configs/multer";

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

  //api
  app.get("/api/v1/getListUser", apiController.getListUser);
  app.get("/api/v1/getUserByUsername/:username", apiController.getDetailUser);
  app.post("/api/v1/addUser", apiController.addUser);
  app.post("/api/v1/deleteUser/:username", apiController.deleteUser);
  app.post("/api/v1/editUser/:username", apiController.editUser);
  app.post("/api/v1/login", apiController.login);
  app.get("/api/v1/logout", apiController.logout);
  // api của buổi 2 react
  app.get("/api/v1/getListGroup", apiController.getListGroup);
  app.get("/api/v1/getGroupById/:id", apiController.getGroupById);
  app.post("/api/v1/addGroup", apiController.addGroup);
  app.post("/api/v1/editGroup", apiController.editGroup);
  app.post("/api/v1/deleteGroup/:idnhom", apiController.deleteGroup);

  app.get("/api/v1/getListProduct", apiController.getListProduct);
  app.get("/api/v1/getDetailProduct/:masp", apiController.getDetailProduct);
  app.post(
    "/api/v1/addProduct",
    upload.single("inpImage"),
    apiController.addProduct
  );
  app.post(
    "/api/v1/editProduct",
    upload.single("inpImage"),
    apiController.editProduct
  );
  app.post("/api/v1/deleteProduct/:masp", apiController.deleteProduct);
};
export default initWebRoutes;
