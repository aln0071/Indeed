const Message = require('../../model/Message');

async function handleRequest(req, callback) {
  try {
    const { chatRoomId } = req.params;
    const messages = await Message.find({ chatRoomId });
    callback(null, messages);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
