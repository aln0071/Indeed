/* eslint-disable linebreak-style */
const mysql = require('mysql');

let db;

require('dotenv').config();

function dbConnectionProvider() {
  if (!db) {
    db = mysql.createPool({
      connectionLimit: 10,
      host: process.env.SQL_HOST,
      port: process.env.SQL_PORT,
      user: process.env.SQL_USERNAME,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE,
    });
  }
  return db;
}
module.exports = dbConnectionProvider();
