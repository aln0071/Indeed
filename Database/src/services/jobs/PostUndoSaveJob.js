const User = require('../../model/User');

async function handleRequest(req, callback) {
  try {
    const { jobseekerId } = req.params;
    const { jobId } = req.body;
    const user = await User.updateOne(
      { userId: jobseekerId },
      { $pull: { savedJobs: jobId } },
    );
    console.log(user);
    callback(null, { message: 'undo save success' });
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
