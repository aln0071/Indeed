/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
const Inbox = require('../../model/Inbox');
const Users = require('../../model/User');

async function handleRequest(req, callback) {
  try {
    const { userId } = req.params;
    const { type } = req.query;
    let query = {};
    const queryuser = await Users.findOne({ userId }).select({
      firstName: 1,
      lastName: 1,
      userId: 1,
      _id: 0,
    });
    if (type === 'employer') {
      query = { employerId: userId };
    } else {
      query = { jobSeekerId: userId };
    }
    const rooms = await Inbox.find(query);
    const response = [];
    let user = {};
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i].toJSON();
      if (type === 'employer') {
        user = await Users.findOne({ userId: room.jobSeekerId }).select({
          firstName: 1,
          lastName: 1,
          userId: 1,
          _id: 0,
        });
        response.push({ ...room, employer: queryuser, jobSeeker: user });
      } else {
        user = await Users.findOne({ userId: room.employerId }).select({
          firstName: 1,
          lastName: 1,
          userId: 1,
          _id: 0,
        });
        response.push({ ...room, employer: user, jobSeeker: queryuser });
      }
    }
    callback(null, response);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
