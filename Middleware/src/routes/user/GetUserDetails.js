const router = require('express').Router();
const kafka = require('../../kafka/Client');

router.get('/UserDetailsForId/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    kafka.make_request(
      'indeed_get_user_profile',
      { userId },
      (error, results) => {
        if (error) {
          res.status(400).send(error);
        } else {
          res.status(200).send(results);
        }
      },
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
