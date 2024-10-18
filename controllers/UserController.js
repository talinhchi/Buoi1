import userModel from "../services/UserModel";

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

export default {
  getUserPage,
  getAddUserPage,
  getEditUserPage,
  getDetailUserPage,
  addUser,
  editUser,
  deleteUser,
};
