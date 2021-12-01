/* eslint-disable linebreak-style */
const Company = require('../../model/Company');

// To get ALl companies for Admin
async function handleRequest(req, callback) {
  try {
    const payload = req.params;
    const company = await Company.findOne({ ...payload }).populate('logo');

    // const savedCompany = await company.save();
    callback(null, company);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
