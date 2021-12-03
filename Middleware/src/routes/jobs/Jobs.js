/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const router = require('express').Router();
const kafka = require('../../kafka/Client');
const redisCli = require('../../redis/Connection');

router.post('/company/:companyId/jobs', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };
  const companyJobsRedisUrl = `/company/${req.params.companyId}/jobs`;
  kafka.make_request('indeed_post_job', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      if (results) {
        redisCli.setex(
          companyJobsRedisUrl,
          3600,
          JSON.stringify({ jobs: results.allCompanyJobs }),
        );
      }
      res.status(200).send(results.data);
    }
  });
});

router.post('/jobs/applicantstatus', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };
  kafka.make_request(
    'indeed_update_applicant_status',
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

router.get('/company/:companyId/jobs', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };
  let metadata = {};
  const redisUrl = `/company/${req.params.companyId}/jobs`;
  redisCli.get(redisUrl, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      const allJobs = JSON.parse(data).jobs;
      if (req.query.page && req.query.limit) {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;
        const slicedData = allJobs.slice((page - 1) * limit, page * limit);
        const totalCount = allJobs.length;
        const noOfPagesLeft = totalCount <= limit ? 0 : Math.ceil(totalCount / limit - page);
        const totalPages = Math.ceil(totalCount / limit);
        metadata = {
          noOfPagesLeft,
          totalCount,
          totalPages,
        };
        return res.status(200).send({ metadata, reviews: slicedData });
      }
      if (req.query.page || req.query.limit) {
        const error = { message: 'Pass both page and limit and not just one' };
        return res.status(400).send(error);
      }
      return res.status(200).send(allJobs);
    }
    kafka.make_request('indeed_get_jobs', request, (error, results) => {
      if (error) {
        return res.status(400).send(error);
      }
      if (results) {
        redisCli.setex(
          redisUrl,
          3600,
          JSON.stringify({ jobs: results.allJobs }),
        );
      }
      return res.status(200).send(results.data);
    });
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
    kafka.make_request('indeed_apply_job', request, (error, results) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(results);
      }
    });
  },
);

router.get('/jobseeker/getAppliedJob/:jobseekerId', async (req, res) => {
  const request = {
    params: req.params,
    body: req.body,
  };
  kafka.make_request('indeed_getapplied_job', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

router.post('/jobseeker/:jobseekerId/saveJob', async (req, res) => {
  const request = {
    params: req.params,
    body: req.body,
  };
  console.log(request);
  kafka.make_request('indeed_post_save_job', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

router.post('/jobseeker/:jobseekerId/undoSaveJob', async (req, res) => {
  const request = {
    params: req.params,
    body: req.body,
  };
  console.log(request);
  kafka.make_request('indeed_post_undosave_job', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

router.get('/salaries/jobs', async (req, res) => {
  const request = {
    params: req.params,
    query: req.query,
  };
  kafka.make_request('indeed_get_salaries', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

router.get('/jobseeker/:jobseekerId/savedJobs', async (req, res) => {
  const request = {
    params: req.params,
    query: req.query,
  };
  kafka.make_request('indeed_get_saved_jobs', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

module.exports = router;
