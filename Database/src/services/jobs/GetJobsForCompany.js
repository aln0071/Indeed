const Jobs = require('../../model/Job');

async function handleRequest(req, callback) {
  try {
    let jobs = {};
    let error = {};
    const { companyId } = req.params;
    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page, 10);
      const limit = parseInt(req.query.limit, 10);
      const skipIndex = (page - 1) * limit;
      jobs = await Jobs.find({ companyId }).limit(limit).skip(skipIndex);
    } else if (req.query.page || req.query.limit) {
      error = { message: 'Pass both page and limit and not just one' };
      callback(error, null);
    } else {
      jobs = await Jobs.find({ companyId });
    }
    callback(null, jobs);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
