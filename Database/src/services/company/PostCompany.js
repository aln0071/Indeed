const Company = require('../../model/Company');

async function handleRequest(req, callback) {
  try {
    const payload = req.body;
    const company = new Company({ ...payload });
    const savedCompany = await company.save();
    callback(null, savedCompany);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
