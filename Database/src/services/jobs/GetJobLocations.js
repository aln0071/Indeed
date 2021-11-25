const Jobs = require('../../model/Job');

async function handleRequest(req, callback) {
  try {
    const locations = await Jobs.aggregate([
      {
        $group: {
          _id: {
            city: '$address.city',
            state: '$address.state',
            country: '$address.country',
          },
        },
      },
      {
        $project: {
          _id: 0,
          city: '$_id.city',
          state: '$_id.state',
          country: '$_id.country',
        },
      },
    ]);
    callback(null, locations);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
