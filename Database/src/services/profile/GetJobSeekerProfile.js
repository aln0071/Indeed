const Users = require('../../model/User');

async function handleRequest(msg, callback) {
  console.log('msg type', msg);
  {
    const userId = msg.id;
    console.log('msg', userId);
    const userDetails = await Users.findOne(
      { userId },
      {
        firstName: 1,
        lastName: 1,
        mobile: 1,
        address: 1,
        resume: 1,
        readyToWork: 1,
      },
    );
    console.log('here', userDetails);
    if (!userDetails) {
      console.log('user not found');
      callback({ msg: 'User not found' }, null);
    } else {
      console.log('user found');
      callback(null, userDetails);
    }
  }
}

exports.handle_request = handleRequest;
