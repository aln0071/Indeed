const Reviews = require('../../model/Review');

async function handleRequest(req, callback) {
  try {
    let review;
    if (req.query.approved === 'false') {
      review = await Reviews.findByIdAndRemove(req.query.id);
    } else {
      review = await Reviews.updateOne(
        { _id: req.query.id },
        { approved: req.query.approved },
      );
    }

    callback(null, review);
  } catch (err) {
    callback(err, null);
  }
}

exports.handle_request = handleRequest;
