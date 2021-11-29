const Reviews = require('../../model/Review');

async function handleRequest(req, callback) {
  const { reviewId } = req.params;
  const { helpfulnessPositive, helpfulnessNegative } = req.body;
  try {
    const review = await Reviews.findOne({ reviewId });
    if (helpfulnessPositive) {
      review.helpfulnessPositive = parseInt(review.helpfulnessPositive, 10)
        || 0 + parseInt(helpfulnessPositive, 10);
    } else if (helpfulnessNegative) {
      review.helpfulnessNegative = parseInt(review.helpfulnessNegative, 10)
        || 0 + parseInt(helpfulnessNegative, 10);
    }
    const savedReview = review.save();
    callback(null, savedReview);
  } catch (err) {
    callback(err, null);
  }
}

exports.handle_request = handleRequest;
