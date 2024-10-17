import pool from "../configs/db";
import { hashSync } from "bcrypt";

const getAllUser = async () => {
  const [row, fields] = await pool.execute("SELECT * FROM `users`");
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
export default { getAllUser, addUser };
