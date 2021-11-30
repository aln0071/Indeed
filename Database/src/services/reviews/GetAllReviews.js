const Reviews = require('../../model/Review');

async function handleRequest(req, callback) {
  try {
    const review = await Reviews.find({ approved: false });
    callback(null, review);
  } catch (err) {
    callback(err, null);
  }
}

exports.handle_request = handleRequest;
