require('dotenv').config();

const config = {
  mongoDB: process.env.mongoDB,
};

module.exports = config;
