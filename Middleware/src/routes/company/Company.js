const router = require('express').Router();
const kafka = require('../../kafka/Client');
// const redisCli = require('../../redis/Connection');
// const { checkRedis } = require('../../redis/Middleware');

router.post('/company', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_post_company', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

module.exports = router;
