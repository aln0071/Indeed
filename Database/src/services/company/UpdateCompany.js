/* eslint-disable new-cap */
const mongoose = require('mongoose');
const Company = require('../../model/Company');

async function handleRequest(req, callback) {
  try {
    const payload = req.body;
    const { companyId } = payload;
    const pictures = payload.pictures || [];
    delete payload.pictures;
    if (companyId === undefined) {
      payload.companyId = new mongoose.mongo.ObjectId();
    }
    const company = await Company.findOneAndUpdate(
      { companyId },
      {
        $set: { ...payload },
        $push: { pictures },
      },
      {
        new: true,
        upsert: true,
      },
    )
      .populate('pictures')
      .populate('logo');
    callback(null, company);
  } catch (error) {
    console.log(error);
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
