const User = require('../../model/User');

async function handleRequest(req, callback) {
  try {
    const payload = req.body;
    const { userId } = payload;
    if (userId === undefined) {
      callback({ error: 'unable to determine user' }, null);
    }
    const user = await User.findOneAndUpdate(
      { userId },
      {
        $set: { ...payload },
      },
      {
        new: true,
        upsert: true,
      },
    ).populate('profilePicId');
    callback(null, user);
  } catch (error) {
    console.log('error', error);
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
