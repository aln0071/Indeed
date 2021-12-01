const Users = require('../../model/User');

async function handleRequest(msg, callback) {
  const { userId } = msg;
  const userDetails = await Users.findOne({ userId });
  if (!userDetails) {
    callback({ error: 'User not found' }, null);
  } else {
    callback(null, userDetails);
  }
}

exports.handle_request = handleRequest;
