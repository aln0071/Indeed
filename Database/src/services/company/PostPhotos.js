/* eslint-disable new-cap */
const Company = require('../../model/Company');

async function handleRequest(req, callback) {
  try {
    const payload = req.body;
    const { companyId } = payload;
    const company = await Company.findOneAndUpdate({ companyId }, payload, {
      new: true,
      upsert: true,
    }).populate('pictures');
    callback(null, company);
  } catch (error) {
    console.log(error);
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
