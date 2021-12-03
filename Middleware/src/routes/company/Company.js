/* eslint-disable linebreak-style */
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

  kafka.make_request('indeed_put_company', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

router.put('/company', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_put_company', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

router.get('/companies', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_get_all_company', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});
// indeed_get_company
router.get('/companiesList', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_get_company', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

router.get('/companyDetails/:companyId', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_get_companyDetails', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

router.get('/companyDetails/forEmployer/:employerId', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };
  kafka.make_request(
    'indeed_get_companyDetails_by_employerId',
    request,
    (error, results) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(results || {});
      }
    },
  );
});

module.exports = router;
