/* eslint-disable linebreak-style */
const Company = require('../../model/Company');

// To get company details
async function handleRequest(req, callback) {
  try {
    const company = await Company.findOne({
      companyId: req.params.companyId,
    }).populate('pictures');

    // const savedCompany = await company.save();
    callback(null, company);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
