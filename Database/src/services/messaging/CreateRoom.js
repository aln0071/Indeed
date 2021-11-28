const Inbox = require('../../model/Inbox');

async function handleRequest(req, callback) {
  try {
    const payload = req.body;
    const room = new Inbox({ ...payload });
    const savedRoom = await room.save();
    callback(null, savedRoom);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
