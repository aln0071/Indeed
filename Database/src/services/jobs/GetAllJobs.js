/* eslint-disable max-len */
const Jobs = require('../../model/Job');

async function handleRequest(req, callback) {
  try {
    let jobs = {};
    let error = {};
    let metadata = {};

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
          $or: [
            { 'address.city': { $regex: where, $options: 'i' } },
            { 'address.state': { $regex: where, $options: 'i' } },
            { 'address.zipcode': { $regex: where, $options: 'i' } },
            { 'address.country': { $regex: where, $options: 'i' } },
          ],
        });
      }
      let query = {};
      if (condition.length !== 0) {
        query = {
          $and: condition,
        };
      }

      const totalCount = await Jobs.find(query).count();
      const noOfPagesLeft = totalCount <= limit ? 0 : Math.ceil(totalCount / limit - page);
      const totalPages = Math.ceil(totalCount / limit);
      metadata = {
        noOfPagesLeft,
        totalCount,
        totalPages,
      };

      jobs = await Jobs.find(query)
        .limit(limit)
        .skip(skipIndex)
        .populate('company');
    } else if (req.query.page || req.query.limit) {
      error = { message: 'Pass both page and limit and not just one' };
      callback(error, null);
    } else if (req.query.where && req.query.what) {
      const condition = [];
      if (what) {
        condition.push({ jobTitle: { $regex: what, $options: 'i' } });
      }
      if (where) {
        condition.push({
          $or: [
            { 'address.city': { $regex: where, $options: 'i' } },
            { 'address.state': { $regex: where, $options: 'i' } },
            { 'address.zipcode': { $regex: where, $options: 'i' } },
            { 'address.country': { $regex: where, $options: 'i' } },
          ],
        });
      }
      let query = {};
      if (condition.length !== 0) {
        query = {
          $and: condition,
        };
      }
      jobs = await Jobs.find(query);
    }
    callback(null, { metadata, jobs });
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
