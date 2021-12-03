const { addPictures } = require('./Pictures');

async function handleRequest(req, callback) {
  try {
    const response = await addPictures(req);
    callback(null, response);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
