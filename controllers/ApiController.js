import userModel from "../services/UserModel";
import { compareSync } from "bcrypt";

const getListUser = async (req, res) => {
  const listUsers = await userModel.getAllUser();
  return res.status(200).json({
    users: listUsers,
    error: false,
    message: "Lấy danh sách người dùng thành công",
  });
};
const getDetailUser = async (req, res) => {
  const { username } = req.params;
  const user = await userModel.getUserByUsername(username);
  return res.status(200).json({
    user: user[0],
    error: false,
    message: "Lấy thông tin người dùng thành công",
  });
};
const addUser = async (req, res) => {
  const data = req.body;
  //   kiểm tra trùng username
  const user = await userModel.getUserByUsername(data.username);
  if (user.length !== 0) {
    return res.status(200).json({
      error: true,
      message: "Username đã tồn tại",
    });
  }
  await userModel.addUser(data);
  return res.status(200).json({
    error: false,
    message: "Thêm người dùng thành công",
  });
};
const deleteUser = async (req, res) => {
  const { username } = req.params;
  await userModel.deleteUser(username);
  return res.status(200).json({
    error: false,
    message: "Xóa người dùng thành công",
  });
};
const editUser = async (req, res) => {
  const { username } = req.params;
  const data = req.body;
  await userModel.editUser(username, data);
  return res.status(200).json({
    error: false,
    message: "Sửa thông tin người dùng thành công",
  });
};
const login = (req, res) => {
  const { username, password } = req.body;
  const user = userModel.getUserByUsername(username);
  if (user.length === 0) {
    return res.status(200).json({
      error: true,
      message: "Thông tin đăng nhập không đúng",
    });
  }
  if (!compareSync(password, user[0].password)) {
    return res.status(200).json({
      error: true,
      message: "Thông tin đăng nhập không đúng",
    });
  }
  req.session.user = user[0];
  req.session.isAuth = true;
  req.session.role = user[0].role;
  return res.status(200).json({
    error: false,
    message: "Đăng nhập thành công",
  });
};
const logout = (req, res) => {
  req.session.destroy();
  return res.status(200).json({
    error: false,
    message: "Đăng xuất thành công",
  });
};
export default {
  getListUser,
  getDetailUser,
  addUser,
  deleteUser,
  editUser,
  login,
  logout,
};
