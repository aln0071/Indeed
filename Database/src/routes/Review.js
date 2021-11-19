const router = require('express').Router();
const Reviews = require('../model/Reviews');

router.post('/jobseeker/:companyId/reviews', async (req, res) => {
  const payload = req.body;
  const review = new Reviews({ ...payload, companyId: req.params.companyId });
  const savedReview = await review.save();
  res.status(200).send(savedReview);
});

router.get('/jobseeker/:companyId/reviews', async (req, res) => {
  const { companyId } = req.params;
  const reviews = await Reviews.find({ companyId }, { comment: 1 });
  res.status(200).send(reviews);
});

module.exports = router;
