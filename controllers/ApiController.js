import userModel from "../services/UserModel";
import groupModel from "../services/GroupModel";
import productModel from "../services/ProductModel";
import { compareSync } from "bcrypt";
import fs from "fs";

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
const getListGroup = async (req, res) => {
  const listGroups = await groupModel.getAllGroup();
  return res.status(200).json({
    groups: listGroups,
    error: false,
    message: "Lấy danh sách nhóm thành công",
  });
};
const getGroupById = async (req, res) => {
  const { id } = req.params;
  const group = await groupModel.getGroupById(id);
  return res.status(200).json({
    group: group[0],
    error: false,
    message: "Lấy thông tin nhóm thành công",
  });
};
const addGroup = async (req, res) => {
  const { name } = req.body;
  await groupModel.addGroup(name);
  return res.status(200).json({
    error: false,
    message: "Thêm nhóm thành công",
  });
};
const editGroup = async (req, res) => {
  const { idnhom, name } = req.body;
  await groupModel.editGroup(idnhom, name);
  return res.status(200).json({
    error: false,
    message: "Sửa thông tin nhóm thành công",
  });
};
const deleteGroup = async (req, res) => {
  const { idnhom } = req.params;
  await groupModel.deleteGroup(idnhom);
  return res.status(200).json({
    error: false,
    message: "Xóa nhóm thành công",
  });
};
const getListProduct = async (req, res) => {
  const listProducts = await productModel.getAllProduct();
  return res.status(200).json({
    products: listProducts,
    error: false,
    message: "Lấy danh sách sản phẩm thành công",
  });
};
const getDetailProduct = async (req, res) => {
  const { masp } = req.params;
  const product = await productModel.getDetailProduct(masp);
  return res.status(200).json({
    product: product[0],
    error: false,
    message: "Lấy thông tin sản phẩm thành công",
  });
};
const addProduct = async (req, res) => {
  const data = req.body;
  const nameImg = req.file.filename;
  data.hinhanh = nameImg;
  await productModel.addProduct(data);
  return res.status(200).json({
    error: false,
    message: "Thêm sản phẩm thành công",
  });
};
const editProduct = async (req, res) => {
  const data = req.body;
  if (req.file) {
    if (fs.existsSync(`public/images/${data.hinhanh}`)) {
      fs.unlinkSync(`public/images/${data.hinhanh}`);
    }
    const nameImg = req.file.filename;
    data.hinhanh = nameImg;
  }
  await productModel.editProduct(data);
  return res.status(200).json({
    error: false,
    message: "Sửa thông tin sản phẩm thành công",
  });
};
const deleteProduct = async (req, res) => {
  const { masp } = req.params;
  const product = await productModel.getDetailProduct(masp);
  if (fs.existsSync(`public/images/${product[0].hinhanh}`)) {
    fs.unlinkSync(`public/images/${product[0].hinhanh}`);
  }
  await productModel.deleteProduct(masp);
  return res.status(200).json({
    error: false,
    message: "Xóa sản phẩm thành công",
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
  getListGroup,
  getGroupById,
  addGroup,
  editGroup,
  deleteGroup,
  getListProduct,
  getDetailProduct,
  addProduct,
  editProduct,
  deleteProduct,
};
