const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.SQL_HOST,
  port: process.env.SQL_PORT,
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  connectionLimit: process.env.SQL_POOL_SIZE,
  ssl: 'Amazon RDS',
});

module.exports = { pool };
