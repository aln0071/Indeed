const Reviews = require('../../model/Review');

async function handleRequest(req, callback) {
  const { companyId } = req.params;
  const reviews = await Reviews.find({ companyId });
  callback(null, reviews);
}

exports.handle_request = handleRequest;
