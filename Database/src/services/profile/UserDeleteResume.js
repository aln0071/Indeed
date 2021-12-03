const User = require('../../model/User');

async function handleRequest(req, callback) {
  try {
    const { userId } = req.params;
    const user = await User.updateOne({ userId }, { $set: { resume: '' } });
    console.log(user);
    callback(null, { message: 'Successfully deleted your resume' });
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
