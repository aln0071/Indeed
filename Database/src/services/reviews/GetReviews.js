const Reviews = require('../../model/Review');

async function handleRequest(req, callback) {
  const { companyId } = req.params;
  const { sort } = req.query;
  const { order } = req.query;
  let sortCriteria = {};
  let sortOrder;
  let reviews = {};
  let error = {};
  if (order === 'desc') {
    sortOrder = -1;
  } else {
    sortOrder = 1;
  }
  if (sort === 'rating') {
    sortCriteria = { normalRating: parseInt(sortOrder, 10) };
  } else if (sort === 'date') {
    sortCriteria = { createdAt: parseInt(sortOrder, 10) };
  } else if (sort === 'helpful') {
    sortCriteria = { helpfulnessPositive: parseInt(sortOrder, 10) };
  }
  try {
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
    } else if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page, 10);
      const limit = parseInt(req.query.limit, 10);
      const skipIndex = (page - 1) * limit;
      reviews = await Reviews.find({ companyId })
        .sort(sortCriteria)
        .limit(limit)
        .skip(skipIndex);
    } else if (req.query.page || req.query.limit) {
      error = { message: 'Pass both page and limit and not just one' };
      callback(error, null);
    } else {
      reviews = await Reviews.find({ companyId });
    }
    callback(null, reviews);
  } catch (err) {
    callback(err, null);
  }
}

exports.handle_request = handleRequest;
