import mysql from "mysql2";
import dotenv from "dotenv/config";
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const connection = pool.promise();
export default connection;
