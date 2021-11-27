const User = require('../../model/User');

async function handleRequest(req, callback) {
  try {
    const payload = req.body;
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      callback(null, { msg: 'User not found' });
    }
    User.findOneAndUpdate(
      { userId: req.params.userId },
      payload,
      { new: true },
      (err, updatedUser) => {
        if (err) callback(null, err);
        callback(null, updatedUser);
      },
    );
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
