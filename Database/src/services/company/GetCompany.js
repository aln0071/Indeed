/* eslint-disable max-len */
// Get company with name and location
const Company = require('../../model/Company');

async function handleRequest(req, callback) {
  try {
    const payload = req.query;
    const { companyName = '', location = '' } = payload;
    let companies = [];
    const nameRegex = new RegExp(companyName, 'i');
    const locationRegex = new RegExp(location, 'i');
    if (companyName && location) {
      companies = await Company.find({
        $and: [
          { companyName: nameRegex },
          { 'address.city': locationRegex },
          { 'address.state': locationRegex },
          { 'address.country': locationRegex },
        ],
      });
    } else if (companyName) {
      companies = await Company.find({ companyName: nameRegex });
    } else if (location) {
      companies = await Company.find({
        $or: [
          { 'address.city': { $regex: locationRegex } },
          { 'address.state': locationRegex },
          { 'address.country': locationRegex },
        ],
      });
    } else {
      companies = [];
    }
    // const savedCompany = await company.save();
    callback(null, companies);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
