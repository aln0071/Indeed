const Picture = require('../../model/Picture');

async function handleRequest(req, callback) {
  try {
    let picture;
    if (req.query.approved === 'false') {
      picture = await Picture.findByIdAndRemove(req.query.id);
    } else {
      picture = await Picture.updateOne(
        { _id: req.query.id },
        { isApproved: req.query.approved },
      );
    }

    callback(null, picture);
  } catch (err) {
    callback(err, null);
  }
}

exports.handle_request = handleRequest;
