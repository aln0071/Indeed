/* eslint-disable no-plusplus */
const User = require('../../model/User');
const Jobs = require('../../model/Job');

async function handleRequest(req, callback) {
  try {
    const { jobseekerId } = req.params;
    const user = await User.findOne({ userId: jobseekerId });
    const jobs = await Jobs.find({ jobId: { $in: user.savedJobs } });
    callback(null, jobs);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
