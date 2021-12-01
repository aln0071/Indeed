const Reviews = require('../../model/Review');

async function handleRequest(req, callback) {
  let reviews = {};
  let error = {};
  const { companyId } = req.params;
  const { sort } = req.query;
  const { order } = req.query;
  let sortCriteria = {};
  let sortOrder;
  if (order === 'desc') {
    sortOrder = -1;
  } else {
    sortOrder = 1;
  }
  if (sort === 'rating') {
    sortCriteria = { rating: parseInt(sortOrder, 10) };
  } else if (sort === 'date') {
    sortCriteria = { reviewDate: parseInt(sortOrder, 10) };
  } else if (sort === 'helpful') {
    sortCriteria = { helpfulnessPositive: parseInt(sortOrder, 10) };
  }
  try {
    const allCompanyReviews = await Reviews.find({ companyId });
    if (
      req.query.page
      && req.query.limit
      && req.query.sort
      && req.query.order
    ) {
      const page = parseInt(req.query.page, 10);
      const limit = parseInt(req.query.limit, 10);
      const skipIndex = (page - 1) * limit;

      reviews = await Reviews.find({ companyId })
        .sort(sortCriteria)
        .limit(limit)
        .skip(skipIndex);
    } else if (req.query.sort && req.query.order) {
      reviews = await Reviews.find({ companyId }).sort(sortCriteria);
    } else if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page, 10);
      const limit = parseInt(req.query.limit, 10);
      const skipIndex = (page - 1) * limit;
      reviews = await Reviews.find({ companyId }).limit(limit).skip(skipIndex);
    } else if (req.query.page || req.query.limit) {
      error = { message: 'Pass both page and limit and not just one' };
      callback(error, null);
    } else {
      reviews = allCompanyReviews;
    }
    callback(null, { data: reviews, allCompanyReviews });
  } catch (err) {
    callback(err, null);
  }
}

exports.handle_request = handleRequest;
