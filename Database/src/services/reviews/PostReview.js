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
    const allCompanyReviews = await Reviews.find({
      companyId: req.params.companyId,
    });
    callback(null, { data: savedReview, allCompanyReviews });
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
