/* eslint no-param-reassign: 0, no-prototype-builtins: 0 */
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { pool } = require('./mysql');

dotenv.config();

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

// to generate new access token
function generateAccessToken(username) {
  return jwt.sign({ username }, process.env.SECRET, { expiresIn: '1h' });
}

function authWithPassport() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  };

  passport.use(
    new JwtStrategy(opts, async (jwtPayload, callback) => {
      try {
        // const { username } = jwtPayload;
        // const user = await findUserWithEmail(username);
        // if (user === null) {
        //   throw new Error('Invalid user');
        // }
        console.log(jwtPayload);
        callback(null, jwtPayload);
      } catch (error) {
        callback(null, false);
      }
    }),
  );
}

const authMiddleware = passport.authenticate('jwt', { session: false });

module.exports = {
  executeQuery,
  generateAccessToken,
  authWithPassport,
  authMiddleware,
};
