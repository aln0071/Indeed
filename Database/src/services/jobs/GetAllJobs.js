/* eslint-disable max-len */
const Jobs = require('../../model/Job');

async function handleRequest(req, callback) {
  try {
    let jobs = {};
    let error = {};
    const { what } = req.query;
    const { where } = req.query;
    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page, 10);
      const limit = parseInt(req.query.limit, 10);
      const skipIndex = (page - 1) * limit;
      const condition = [];
      if (what) {
        condition.push({ jobTitle: { $regex: what, $options: 'i' } });
      }
      if (where) {
        condition.push({
          $or: [{ 'address.city': { $regex: where, $options: 'i' } },
            { 'address.state': { $regex: where, $options: 'i' } },
            { 'address.zipcode': { $regex: where, $options: 'i' } },
            { 'address.country': { $regex: where, $options: 'i' } },
          ],
        });
      }
      jobs = await Jobs.find(
        {
          $and: condition,
        },
      ).limit(limit).skip(skipIndex);
    } else if (req.query.page || req.query.limit) {
      error = { message: 'Pass both page and limit and not just one' };
      callback(error, null);
    } else {
      jobs = await Jobs.find();
    }
    callback(null, jobs);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
