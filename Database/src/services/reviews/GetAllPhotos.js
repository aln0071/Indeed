const Picture = require('../../model/Picture');

async function handleRequest(req, callback) {
  try {
    const review = await Picture.find({ isApproved: false });
    callback(null, review);
  } catch (err) {
    callback(err, null);
  }
}

exports.handle_request = handleRequest;
