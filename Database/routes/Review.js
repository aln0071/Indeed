const router = require('express').Router();
const Reviews = require('../model/Reviews');
const redisCli = require('../redis/Connection');

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

router.post('/jobseeker/:companyId/reviews', async (req, res) => {
  const payload = req.body;
  const review = new Reviews({ ...payload, companyId: req.params.companyId });
  const savedReview = await review.save();
  res.status(200).send(savedReview);
});

router.get('/jobseeker/:companyId/reviews', redisCache, async (req, res) => {
  const { companyId } = req.params;
  const reviews = await Reviews.find({ companyId }, { comment: 1 });
  if (reviews) {
    const { url } = req;
    redisCli.setex(url, 3600, JSON.stringify(reviews));
  }
  res.status(200).send(reviews);
});

module.exports = router;
