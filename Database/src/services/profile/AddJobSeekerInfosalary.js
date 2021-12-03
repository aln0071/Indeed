/* eslint-disable linebreak-style */
const User = require('../../model/User');

async function handleRequest(req, callback) {
  try {
    const payload = {
      companyId: req.body.companyId,
      companyName: req.body.companyName,
      jobTitle: req.body.jobTitle,
      jobLocation: req.body.jobLocation,
      currentlyWorking: req.body.currentlyWorking,
      endDate: req.body.endDate,
      salary: req.body.currentPay,
      currentExperience: req.body.relevantExp,
      benefits: {
        paidTimeOff: req.body.paidTimeOff,
        healthInsurance: req.body.healthInsurance,
        lifeInsurance: req.body.lifeInsurance,
        dentalVisionInsurance: req.body.dentalVisionInsurance,
        retirement: req.body.retirement,
        otherBenefits: req.body.otherBenefits,
        otherBenefitsDesc: req.body.otherBenefitsDesc,
      },
    };

    console.log(payload);

    const { userId } = req.params;
    if (userId === undefined) {
      callback({ error: 'unable to determine user' }, null);
    }

    // await User.findOneAndUpdate({ userId: req.params.userId });

    const user = await User.findOneAndUpdate(
      { userId: req.params.userId },
      {
        $set: { ...payload },
      },
      {
        new: true,
        upsert: true,
      },
    );
    callback(null, user);
  } catch (error) {
    callback(error, null);
  }
}

exports.handle_request = handleRequest;
