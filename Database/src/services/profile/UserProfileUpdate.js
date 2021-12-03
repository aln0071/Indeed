const User = require('../../model/User');

async function handleRequest(req, callback) {
  try {
    const payload = {
      userId: req.body.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobile: req.body.mobile,
      resume: req.body.resume,
      address: {
        addressLine1: req.body.street,
        city: req.body.city,
        zipCode: req.body.zip,
      },
      jobPreference: {
        jobTitle: req.body.jobTitle,
        jobType: req.body.jobType,
        contract: req.body.contract,
        desiredPay: req.body.desiredPay,
      },
    };

    const { userId } = payload;
    if (userId === undefined) {
      callback({ error: 'unable to determine user' }, null);
    }
    const user = await User.findOneAndUpdate(
      { userId },
      {
        $set: { ...payload },
      },
      {
        new: true,
        upsert: true,
      },
    ).populate('profilePicId');
    callback(null, user);
  } catch (error) {
    console.log('error', error);
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
