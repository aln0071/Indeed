const Reviews = require('../../model/Review');

async function handleRequest(req, callback) {
  try {
    const payload = req.body;
    // eslint-disable-next-line max-len
    const review = new Reviews({
      ...payload,
      companyId: req.params.companyId,
      approved: false,
      isFeatured: false,
      reviewDate: Date.now(),
    });
    const savedReview = await review.save();
    callback(null, savedReview);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
