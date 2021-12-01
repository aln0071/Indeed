const Reviews = require('../../model/Review');

async function handleRequest(req, callback) {
  try {
    const { userId } = req.params;
    const { companyId } = req.params;
    const userReviews = await Reviews.findOne({ companyId, userId });
    const featuredReviews = await Reviews.find({
      companyId,
      isFeatured: true,
    }).limit(5);
    const response = { userReviews, featuredReviews };
    callback(null, response);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
