const Jobs = require('../../model/Job');

async function handleRequest(req, callback) {
  try {
    const payload = req.body;
    const job = new Jobs({ ...payload, companyId: req.params.companyId });
    const savedJob = await job.save();
    const companyJobs = await Jobs.find({ companyId: req.params.companyId });
    callback(null, { data: savedJob, allCompanyJobs: companyJobs });
  } catch (error) {
    console.log('error', error);
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
