/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
const Jobs = require('../../model/Job');
const Reviews = require('../../model/Review');
const Companies = require('../../model/Company');

async function handleRequest(req, callback) {
  try {
    let averageSalary;
    const { what } = req.query;
    const { where } = req.query;

    const condition = [];
    if (what && where) {
      condition.push({ jobTitle: { $regex: what, $options: 'i' } });
      condition.push({
        $or: [
          { 'address.city': { $regex: where, $options: 'i' } },
          { 'address.state': { $regex: where, $options: 'i' } },
          { 'address.zipcode': { $regex: where, $options: 'i' } },
          { 'address.country': { $regex: where, $options: 'i' } },
        ],
      });
      let averageSalaryQuery = {};
      if (condition.length !== 0) {
        averageSalaryQuery = [
          { $match: { $and: condition } },
          { $group: { _id: null, averageSalary: { $avg: '$jobSalary' } } },
          { $project: { _id: 0 } },
        ];
      }
      averageSalary = await Jobs.aggregate(averageSalaryQuery);
      if (averageSalary.length) {
        averageSalary = averageSalary[0].averageSalary;
      }
      let topCompanies = {};
      let topCompaniesQuery = {};
      topCompaniesQuery = [
        { $match: { $and: condition } },
        {
          $group: { _id: '$companyId', averageSalary: { $avg: '$jobSalary' } },
        },
        { $sort: { averageSalary: -1 } },
        { $limit: 5 },
        {
          $project: {
            _id: 0,
            companyId: '$_id',
            averageSalary: 1,
          },
        },
      ];
      topCompanies = await Jobs.aggregate(topCompaniesQuery);
      let reviewQuery = {};
      let company = {};
      let review = {};
      for (let i = 0; i < topCompanies.length; i++) {
        reviewQuery = [
          { $match: { companyId: topCompanies[i].companyId } },
          {
            $group: {
              _id: null,
              averageRating: { $avg: '$rating' },
              reviewCount: { $sum: 1 },
            },
          },
        ];
        review = await Reviews.aggregate(reviewQuery);
        company = await Companies.findOne({
          companyId: topCompanies[i].companyId,
        });
        topCompanies[i].averageRating = review[0].averageRating.toFixed(2);
        topCompanies[i].reviewCount = review[0].reviewCount;
        topCompanies[i].companyName = company.companyName;
      }
      callback(null, { averageSalary, topCompanies });
    }
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
