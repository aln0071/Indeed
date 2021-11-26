const Jobs = require('../../model/Job');

async function handleRequest(req, callback) {
  try {
    const payload = req.body;
    const job = new Jobs({ ...payload, companyId: req.params.companyId });
    const savedJob = await job.save();
    callback(null, savedJob);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
