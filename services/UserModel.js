import pool from "../configs/db";
import { hashSync } from "bcrypt";

const getAllUser = async () => {
  const [row, fields] = await pool.execute("SELECT * FROM `users`");
  return row;
};
const getUserByUsername = async (username) => {
  const [row, fields] = await pool.execute(
    "SELECT * FROM `users` WHERE `username` = ?",
    [username]
  );
  return row;
};
const addUser = async (data) => {
  const hashedPassword = hashSync(data.password, 10);
  const [row, fields] = await pool.execute(
    "INSERT INTO `users` (`username`, `password`, `fullname`, `address` ,`sex`, `email`) VALUES (?, ?, ?, ?, ?, ?)",
    [
      data.username,
      hashedPassword,
      data.fullname,
      data.address,
      data.sex,
      data.email,
    ]
  );
  return row;
};
const editUser = async (data) => {
  const [row, fields] = await pool.execute(
    "UPDATE `users` SET `username` = ?, `fullname` = ?, `address` = ?, `sex` = ?, `email` = ? WHERE `username` = ?",
    [
      data.username,
      data.fullname,
      data.address,
      data.sex,
      data.email,
      data.usernameEdit,
    ]
  );
  return row;
};
const deleteUser = async (username) => {
  const [row, fields] = await pool.execute(
    "DELETE FROM `users` WHERE `username` = ?",
    [username]
  );
  return row;
};
export default { getAllUser, addUser, deleteUser, getUserByUsername, editUser };
