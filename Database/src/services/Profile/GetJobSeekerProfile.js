const UserDetails = require('../../model/UserDetails');

async function handleRequest(msg, callback) {
  console.log('msg type', msg);
  {
    const userId = msg.id;
    console.log('msg', userId);
    const userDetails = await UserDetails.find(
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
    if (!userDetails) {
      callback(null, { msg: 'User not found' });
    } else {
      callback(null, userDetails);
    }
  }
}

exports.handle_request = handleRequest;
