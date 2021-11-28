const Message = require('../../model/Message');

async function handleRequest(req, callback) {
  try {
    const payload = req.body;
    const message = new Message({ ...payload });
    const savedMessage = await message.save();
    callback(null, savedMessage);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
