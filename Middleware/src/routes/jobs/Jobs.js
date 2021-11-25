const router = require('express').Router();
const kafka = require('../../kafka/Client');
const redisCli = require('../../redis/Connection');
const { checkRedis } = require('../../redis/Middleware');

router.post('/company/:companyId/jobs', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_post_job', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

router.get('/company/:companyId/jobs', checkRedis, async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_get_jobs', request, (error, results) => {
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

router.get('/jobs', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_get_all_jobs', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

router.get('/jobs/locations', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request(
    'indeed_get_all_job_locations',
    request,
    (error, results) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(results);
      }
    },
  );
});

router.get('/company/:companyId/jobs/:jobId', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_get_job', request, (error, results) => {
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

router.post(
  '/jobseeker/:jobseekerId/applyJob/:jobId/:companyId',
  async (req, res) => {
    const request = {
      params: req.params,
      body: req.body,
    };
    console.log(request);
    kafka.make_request('indeed_apply_job', request, (error, results) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(results);
      }
    });
  },
);

module.exports = router;
