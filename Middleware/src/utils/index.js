/* eslint no-param-reassign: 0, no-prototype-builtins: 0 */
const { pool } = require('./mysql');

// to execute an sql query
function executeQuery(queryString, params = {}) {
  return new Promise((resolve, reject) => {
    if (typeof queryString !== 'string' || typeof params !== 'object') {
      reject(new Error('Query must be string and params must be object'));
    }
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
        return;
      }

      // for object to query mapping
      connection.config.queryFormat = function (query, values) {
        if (!values) return query;
        const q = query.replace(/:(\w+)/g, (txt, key) => {
          if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
          }
          return txt;
        });
        return q;
      };

      connection.query(queryString, params, (err, rows) => {
        connection.release();
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
}

module.exports = {
  executeQuery,
};
