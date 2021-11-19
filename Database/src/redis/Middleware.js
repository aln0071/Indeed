const redisCli = require('./Connection');

function redisCache(req, res, next) {
  redisCli.get(req.url, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.status(200).send(JSON.parse(data));
    } else {
      next();
    }
  });
}

module.exports.checkRedis = redisCache;
