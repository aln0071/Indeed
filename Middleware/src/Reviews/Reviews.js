const router = require('express').Router();
const kafka = require('../kafka/Client');
const redisCli = require('../redis/Connection');

router.post('/jobseeker/:companyId/reviews', async (req, res) => {
  const request = {
    query: req.query, params: req.params, body: req.body,
  };

  kafka.make_request('indeed.post.reviews', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

router.get('/jobseeker/:companyId/reviews', async (req, res) => {
  const request = {
    query: req.query, params: req.params, body: req.body,
  };

  kafka.make_request('indeed.get.reviews', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      if (results) {
        const { url } = req;
        redisCli.setex(url, 3600, JSON.stringify(results));
      }
      res.status(200).send(results);
    }
  });
});

module.exports = router;
