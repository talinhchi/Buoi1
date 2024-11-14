import pool from "../configs/db";

const getAllGroup = async () => {
  const [row, fields] = await pool.execute("SELECT * FROM `nhom`");
  return row;
};
const getGroupById = async (idnhom) => {
  const [row, fields] = await pool.execute(
    "SELECT * FROM `nhom` WHERE `idnhom` = ?",
    [idnhom]
  );
  return row;
};
const addGroup = async (name) => {
  const [row, fields] = await pool.execute(
    "INSERT INTO `nhom`(`ten`) VALUES (?)",
    [name]
  );
  return row;
};
const editGroup = async (idnhom, name) => {
  const [row, fields] = await pool.execute(
    "UPDATE `nhom` SET `ten` = ? WHERE `idnhom` = ?",
    [name, idnhom]
  );
  return row;
};
const deleteGroup = async (idnhom) => {
  const [row, fields] = await pool.execute(
    "DELETE FROM `nhom` WHERE `idnhom` = ?",
    [idnhom]
  );
  return row;
};

export default { getAllGroup, getGroupById, addGroup, editGroup, deleteGroup };
