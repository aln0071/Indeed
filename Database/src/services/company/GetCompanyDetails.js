/* eslint-disable linebreak-style */
const Company = require('../../model/Company');
const Reviews = require('../../model/Review');

// To get company details
async function handleRequest(req, callback) {
  try {
    const { companyId } = req.params;
    const company = await Company.findOne({
      companyId: req.params.companyId,
    }).populate('pictures');
    const averageRating = [
      { $match: { companyId } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          averageLearning: { $avg: '$learning' },
          averageAppreciation: { $avg: '$appreciation' },
        },
      },
      { $project: { _id: 0 } },
    ];
    const rating = await Reviews.aggregate(averageRating);
    const response = { ...company.toJSON(), averageRatings: rating[0] };
    callback(null, response);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
