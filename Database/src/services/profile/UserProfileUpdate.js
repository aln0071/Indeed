const User = require('../../model/User');

async function handleRequest(req, callback) {
  try {
    const payload = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobile: req.body.mobile,
      resume: req.body.resume,
      address: {
        addressLine1: req.body.street,
        city: req.body.city,
        zipCode: req.body.zip,
      },
    };

    const user = await User.find({ userId: req.params.userId });
    if (!user) {
      callback(null, { msg: 'User Not Found' });
    }
    User.findOneAndUpdate(
      { userId: req.params.userId },
      payload,
      { new: true },
      (err, updatedUser) => {
        if (err) callback(null, err);
        callback(null, updatedUser);
      },
    );
  } catch (error) {
    console.log('error', error);
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
