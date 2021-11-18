const redis = require('redis');

let client;

function getRedisClient() {
  if (!client) {
    const cli = redis.createClient(6379);
    client = cli;
  }
  return client;
}
module.exports = getRedisClient();
