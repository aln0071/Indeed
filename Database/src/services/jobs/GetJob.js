const Jobs = require('../../model/Job');
const Company = require('../../model/Company');
const Reviews = require('../../model/Review');

async function handleRequest(req, callback) {
  try {
    const { companyId, jobId } = req.params;
    const job = await Jobs.findOne({ jobId });
    const company = await Company.findOne({ companyId });
    const reviewCount = await Reviews.find({ companyId }).count();
    const response = { job, company: { company }, reviewCount };
    callback(null, response);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
