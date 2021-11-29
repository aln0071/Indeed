/* eslint-disable linebreak-style */
const Company = require('../../model/Company');

// To get company details
async function handleRequest(req, callback) {
  try {
    const company = await Company.find({ companyId: req.params.companyId });

    // const savedCompany = await company.save();
    callback(null, company);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
