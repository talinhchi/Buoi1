import pool from "../configs/db";

const getAllProduct = async () => {
  const [row, fields] = await pool.execute(
    "SELECT sanpham.*, nhom.ten as tenNhom FROM `sanpham` join nhom on sanpham.idnhom = nhom.idnhom"
  );
  return row;
};

const getDetailProduct = async (masp) => {
  const [row, fields] = await pool.execute(
    "SELECT sanpham.*, nhom.ten as tenNhom FROM `sanpham` join nhom on sanpham.idnhom = nhom.idnhom WHERE `masp` = ?",
    [masp]
  );
  return row;
};
const addProduct = async (data) => {
  console.log(data);
  const [row, fields] = await pool.execute(
    "INSERT INTO `sanpham`(`ten`, `gia`, `hinhanh`, `mota`, `idnhom`) VALUES (?, ?, ?, ?, ?)",
    [data.ten, data.gia, data.hinhanh, data.mota, data.idnhom]
  );
  return row;
};
const editProduct = async (data) => {
  const [row, fields] = await pool.execute(
    "UPDATE `sanpham` SET `ten` = ?, `gia` = ?, `hinhanh` = ?, `mota` = ?, `idnhom` = ? WHERE `masp` = ?",
    [data.ten, data.gia, data.hinhanh, data.mota, data.idnhom, data.masp]
  );
  return row;
};
const deleteProduct = async (masp) => {
  const [row, fields] = await pool.execute(
    "DELETE FROM `sanpham` WHERE `masp` = ?",
    [masp]
  );
  return row;
};

export default {
  getAllProduct,
  getDetailProduct,
  addProduct,
  editProduct,
  deleteProduct,
};
