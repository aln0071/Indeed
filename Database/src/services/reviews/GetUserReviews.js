const Reviews = require('../../model/Review');

async function handleRequest(req, callback) {
  const { userId } = req.params;
  try {
    const reviews = await Reviews.find({ userId });
    callback(null, reviews);
  } catch (err) {
    callback(err, null);
  }
}

exports.handle_request = handleRequest;
