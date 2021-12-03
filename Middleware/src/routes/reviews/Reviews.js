/* eslint-disable consistent-return */
/* eslint-disable max-len */
const router = require('express').Router();
const kafka = require('../../kafka/Client');
const redisCli = require('../../redis/Connection');

router.post('/jobseeker/:companyId/reviews', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };
  const companyReviewsRedisUrl = `/company/${req.params.companyId}/reviews`;
  kafka.make_request('indeed_post_reviews', request, (error, results) => {
    if (error) {
      return res.status(400).send(error);
    }
    if (results) {
      redisCli.setex(
        companyReviewsRedisUrl,
        3600,
        JSON.stringify({ reviews: results.allCompanyReviews }),
      );
    }
    return res.status(200).send(results.data);
  });
});

router.get('/jobseeker/:companyId/reviews', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };
  let metadata = {};
  const redisUrl = `/company/${req.params.companyId}/reviews`;
  redisCli.get(redisUrl, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      const allReviews = JSON.parse(data).reviews;
      let reviewsToReturn = allReviews;
      const sortByParamAndOrder = (param, order) => {
        const paramName = {
          rating: 'rating',
          date: 'reviewDate',
          helpful: 'helpfulnessPositive',
        };
        if (order === 'desc') {
          return (a, b) => b[paramName[param]] - a[paramName[param]];
        }
        return (a, b) => a[paramName[param]] - b[paramName[param]];
      };
      try {
        if (
          req.query.page
          && req.query.limit
          && req.query.sort
          && req.query.order
        ) {
          const page = parseInt(req.query.page, 10);
          const limit = parseInt(req.query.limit, 10);
          // const skipIndex = (page - 1) * limit;
          const totalCount = allReviews.length;
          const noOfPagesLeft = totalCount <= limit ? 0 : Math.ceil(totalCount / limit - page);
          const totalPages = Math.ceil(totalCount / limit);
          metadata = {
            noOfPagesLeft,
            totalCount,
            totalPages,
          };
          allReviews.sort(sortByParamAndOrder(req.query.sort, req.query.order));
          reviewsToReturn = allReviews.slice((page - 1) * limit, page * limit);
        } else if (req.query.sort && req.query.order) {
          // reviews = await Reviews.find({ companyId }).sort(sortCriteria);
          reviewsToReturn = allReviews.sort(
            sortByParamAndOrder(req.query.sort, req.query.order),
          );
        } else if (req.query.page && req.query.limit) {
          const page = parseInt(req.query.page, 10);
          const limit = parseInt(req.query.limit, 10);
          // const skipIndex = (page - 1) * limit;
          // reviews = await Reviews.find({ companyId }).limit(limit).skip(skipIndex);
          const totalCount = allReviews.length;
          const noOfPagesLeft = totalCount <= limit ? 0 : Math.ceil(totalCount / limit - page);
          const totalPages = Math.ceil(totalCount / limit);
          metadata = {
            noOfPagesLeft,
            totalCount,
            totalPages,
          };
          reviewsToReturn = allReviews.slice((page - 1) * limit, page * limit);
        } else if (req.query.page || req.query.limit) {
          const error = {
            message: 'Pass both page and limit and not just one',
          };
          return res.status(400).send(error);
        } else {
          reviewsToReturn = allReviews;
        }
        return res.status(200).send({ metadata, reviews: reviewsToReturn });
      } catch (error) {
        return res.status(400).send(error);
      }
    } else {
      kafka.make_request('indeed_get_reviews', request, (error, results) => {
        if (error) {
          res.status(400).send(error);
        } else {
          if (results) {
            redisCli.setex(
              redisUrl,
              3600,
              JSON.stringify({ reviews: results.allCompanyReviews }),
            );
          }
          res.status(200).send(results.data);
        }
      });
    }
  });
});

router.get('/jobseeker/reviews/:userId', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_get_user_reviews', request, (error, results) => {
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

router.get('/admin/get_all_reviews', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_get_all_reviews', request, (error, results) => {
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

router.get('/admin/review/action', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };
  kafka.make_request(
    'indeed_admin_review_action',
    request,
    (error, results) => {
      if (error) {
        return res.status(400).send(error);
      }
      if (results) {
        const companyReviewsRedisUrl = `/company/${results.companyId}/reviews`;
        redisCli.setex(
          companyReviewsRedisUrl,
          3600,
          JSON.stringify({ reviews: results.allCompanyReviews }),
        );
      }
      return res.status(200).send(results.data);
    },
  );
});

router.post('/reviews/:reviewId/helpfullness', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request(
    'indeed_post_helpful_reviews',
    request,
    (error, results) => {
      if (error) {
        return res.status(400).send(error);
      }
      if (results) {
        const companyReviewsRedisUrl = `/company/${results.data.companyId}/reviews`;
        redisCli.setex(
          companyReviewsRedisUrl,
          3600,
          JSON.stringify({ reviews: results.allCompanyReviews }),
        );
      }
      return res.status(200).send(results.data);
    },
  );
});

router.get('/jobseeker/:companyId/users/:userId/reviews', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request(
    'indeed_get_featured_user_reviews',
    request,
    (error, results) => {
      if (error) {
        res.status(400).send(error);
      } else {
        if (results) {
          const { url } = req;
          redisCli.setex(url, 3600, JSON.stringify(results));
        }
        res.status(200).send(results);
      }
    },
  );
});

router.get('/admin/review/analytics', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_analytics', request, (error, results) => {
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
  '/reviews/:reviewId/company/:companyId/feature',
  async (req, res) => {
    const request = {
      query: req.query,
      params: req.params,
      body: req.body,
    };

    kafka.make_request(
      'indeed_post_featured_reviews',
      request,
      (error, results) => {
        if (error) {
          res.status(400).send(error);
        } else {
          res.status(200).send(results);
        }
      },
    );
  },
);

router.get('/review/admin/getallphotos', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_get_photos_admin', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

router.get('/admin/photo/review', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request(
    'indeed_review_photos_admin',
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

module.exports = router;
