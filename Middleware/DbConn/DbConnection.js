mysql = require('mysql');  //eslint-disable-line
let db;
require('dotenv').config();

function dbConnectionProvider() {
  if (!db) {
        db = mysql.createPool({   //eslint-disable-line
      connectionLimit: 10,
      host: process.env.host,
      port: process.env.port,
      user: process.env.user,
      password: process.env.password,
      database: 'indeed',
    });
  }
  return db;
}
module.exports = dbConnectionProvider();
