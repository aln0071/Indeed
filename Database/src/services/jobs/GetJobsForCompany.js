const Jobs = require('../../model/Job');

async function handleRequest(req, callback) {
  try {
    let jobs = {};
    let error = {};
    const { companyId } = req.params;
    jobs = await Jobs.find({ companyId }).populate('companyId');
    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page, 10);
      const limit = parseInt(req.query.limit, 10);
      // const skipIndex = (page - 1) * limit;
      const slicedJobs = jobs.slice((page - 1) * limit, page * limit);
      // jobs = await Jobs.find({ companyId }).limit(limit).skip(skipIndex);
      callback(null, { data: slicedJobs, allJobs: jobs });
    } else if (req.query.page || req.query.limit) {
      error = { message: 'Pass both page and limit and not just one' };
      callback(error, null);
    } else {
      // jobs = await Jobs.find({ companyId });
      callback(null, { data: jobs, allJobs: jobs });
    }
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
