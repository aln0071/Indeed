const Reviews = require('../../model/Reviews');

async function handleRequest(req, callback) {
  const payload = req.body;
  const review = new Reviews({ ...payload, companyId: req.params.companyId });
  const savedReview = await review.save();
  callback(null, savedReview);
}

exports.handle_request = handleRequest;
