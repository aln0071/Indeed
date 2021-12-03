/* eslint-disable linebreak-style */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
const Reviews = require('../../model/Review');
const Company = require('../../model/Company');

async function handleRequest(req, callback) {
  try {
    let response;
    switch (req.query.analytics) {
      case 'top5ComapniesBasedOnReview': {
        response = await top5ComapniesBasedOnReview();
        break;
      }
      case 'top5CompaniesBasedOnRating': {
        response = await top5ComapniesBasedOnRating();
        break;
      }
      case 'reviewPerDay': {
        response = await getReviewsPerDay();
        response = {
          count: response.length,
        };
      }
      case 'top5CEOBasedOnRating': {
        response = await top5CEOBasedOnRating();
      }
      default:
        '';
    }
    callback(null, response);
  } catch (err) {
    callback(err, null);
  }
}

async function top5ComapniesBasedOnReview() {
  const finalObj = [];
  const data = await Reviews.aggregate([
    { $group: { _id: '$companyId', value: { $sum: 1 } } },
    { $sort: { value: -1 } },
  ]).limit(5);
  const companyIds = data.map((review) => review._id);
  const companies = await Company.find({ companyId: { $in: companyIds } });
  return generateFinalObj(data, companies);
}

async function top5ComapniesBasedOnRating() {
  const finalObj = [];
  const data = await Reviews.aggregate([
    { $group: { _id: '$companyId', value: { $avg: '$rating' } } },
    { $sort: { value: -1 } },
  ]).limit(5);
  const companyIds = data.map((review) => review._id);
  const companies = await Company.find({ companyId: { $in: companyIds } });
  return generateFinalObj(data, companies);
}

async function top5CEOBasedOnRating() {
  const finalObj = [];
  const data = await Reviews.aggregate([
    { $group: { _id: '$companyId', value: { $avg: '$ceoApproval' } } },
    { $sort: { value: -1 } },
  ]).limit(5);
  const companyIds = data.map((review) => review._id);
  const companies = await Company.find({ companyId: { $in: companyIds } });
  return generateFinalObj(data, companies);
}

function generateFinalObj(data, companies) {
  const finalObj = [];
  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < companies.length; j += 1) {
      if (data[i]._id == companies[j].companyId) {
        const obj = {
          companyId: companies[j].companyId,
          companyName: companies[j].companyName,
          value: Math.round(data[i].value),
        };
        finalObj.push(obj);
      }
    }
  }
  return finalObj;
}

async function getReviewsPerDay() {
  return await Reviews.find({
    reviewDate: {
      $gte: new Date().setHours(0, 0, 0, 0),
      $lt: new Date().setHours(23, 59, 59, 999),
    },
  });
}

exports.handle_request = handleRequest;
