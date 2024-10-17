import { getHomePage } from "../controllers/HomeController";
import { getAboutPage } from "../controllers/AboutController";
import { getContractPage } from "../controllers/ContractController";
import userController from "../controllers/UserController";
const initWebRoutes = (app) => {
  app.get("/", getHomePage);
  app.get("/about", getAboutPage);
  app.get("/contract", getContractPage);
  app.get("/user/view", userController.getUserPage);
  app.get("/user/add", userController.getAddUserPage);
};
export default initWebRoutes;
