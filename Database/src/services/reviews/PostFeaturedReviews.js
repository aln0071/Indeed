const Reviews = require('../../model/Review');

async function handleRequest(req, callback) {
  const { reviewId } = req.params;
  const { isFeatured } = req.body;
  try {
    const review = await Reviews.findOne({ reviewId });
    review.isFeatured = isFeatured;
    const savedReview = review.save();
    callback(null, savedReview);
  } catch (err) {
    callback(err, null);
  }
}

exports.handle_request = handleRequest;
