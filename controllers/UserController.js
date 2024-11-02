import userModel from "../services/UserModel";
import { hashSync, compareSync } from "bcrypt";

// danh sách các hàm controller xử lý view
const getUserPage = async (req, res) => {
  const listUsers = await userModel.getAllUser();
  res.render("views/main", {
    data: {
      title: "User Page",
      page: "viewUser",
      rows: listUsers,
    },
  });
};
const getAddUserPage = (req, res) => {
  res.render("views/main", {
    data: {
      title: "Add User Page",
      page: "addUser",
    },
  });
};
const getDetailUserPage = async (req, res) => {
  const { username } = req.params;
  const user = await userModel.getUserByUsername(username);
  res.render("views/main", {
    data: {
      title: "Detail User Page",
      page: "detailUser",
      user: user[0],
    },
  });
};
const getEditUserPage = async (req, res) => {
  const { username } = req.params;
  const user = await userModel.getUserByUsername(username);
  res.render("views/main", {
    data: {
      title: "Edit User Page",
      page: "editUser",
      user: user[0],
    },
  });
};
const getLoginPage = (req, res) => {
  res.render("views/main", {
    data: {
      title: "Login Page",
      page: "login",
    },
  });
};
// danh sách các hàm controller xử lý form
const addUser = async (req, res) => {
  const data = req.body;
  await userModel.addUser(data);
  res.redirect("/user/viewAll");
};
const editUser = async (req, res) => {
  const data = req.body;
  await userModel.editUser(data);
  res.redirect("/user/viewAll");
};
const deleteUser = async (req, res) => {
  const { username } = req.body;
  await userModel.deleteUser(username);
  res.redirect("/user/viewAll");
};
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.getUserByUsername(username);
  if (user.length === 0) {
    res.redirect("/login");
    return;
  }
  const isCheck = compareSync(password, user[0].password);
  if (!isCheck) {
    res.redirect("/login");
    return;
  }
  req.session.userLogin = user[0];
  req.session.isAuth = true;
  req.session.role = user[0].role;
  res.redirect("/user/viewAll");
};
const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
// api
const getAllUser = async (req, res) => {
  const listUsers = await userModel.getAllUser();
  res.json(listUsers);
};
const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  const user = await userModel.getUserByUsername(username);
  res.json(user);
};
export default {
  getUserPage,
  getAddUserPage,
  getEditUserPage,
  getDetailUserPage,
  getLoginPage,
  addUser,
  editUser,
  deleteUser,
  login,
  logout,
  getAllUser,
  getUserByUsername,
};
