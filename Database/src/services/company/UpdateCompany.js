/* eslint-disable new-cap */
const Company = require('../../model/Company');

async function handleRequest(req, callback) {
  try {
    const payload = req.body;
    const { companyId } = payload;
    const company = await Company.findOneAndUpdate({ companyId }, payload, {
      new: true,
    });
    callback(null, company);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
