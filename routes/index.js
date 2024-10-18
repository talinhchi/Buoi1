import { getHomePage } from "../controllers/HomeController";
import { getAboutPage } from "../controllers/AboutController";
import { getContractPage } from "../controllers/ContractController";
import userController from "../controllers/UserController";
const initWebRoutes = (app) => {
  app.get("/", getHomePage);
  app.get("/about", getAboutPage);
  app.get("/contract", getContractPage);
  app.get("/user/viewAll", userController.getUserPage);
  app.get("/user/view/:username", userController.getDetailUserPage);
  app.get("/user/add", userController.getAddUserPage);
  app.get("/user/edit/:username", userController.getEditUserPage);
  app.post("/api/addUser", userController.addUser);
  app.post("/api/editUser", userController.editUser);
  app.post("/api/delete", userController.deleteUser);
};
export default initWebRoutes;
