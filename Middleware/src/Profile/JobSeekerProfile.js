const router = require('express').Router();
const kafka = require('../kafka/Client');

router.get('/jobseeker/profile/:id', async (req, res) => {
  kafka.make_request(
    'indeed_get_jobseeker_profile',
    req.params,
    (err, results) => {
      console.log('In result');
      console.log('result in msg', results);
      if (err) {
        console.log('err', err);
        res.json({
          status: 'Error',
          msg: 'Error',
        });
        res.status(400).end();
      } else {
        console.log('inside else', results);
        res.status(200).send(results);
      }
    },
  );
});

module.exports = router;
