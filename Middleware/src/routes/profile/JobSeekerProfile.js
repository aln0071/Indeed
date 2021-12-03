const router = require('express').Router();
const kafka = require('../../kafka/Client');

router.get('/jobseeker/profile/:id', async (req, res) => {
  kafka.make_request(
    'indeed_get_jobseeker_profile',
    req.params,
    (err, results) => {
      // console.log('In result');
      // console.log('result in msg', results);
      if (err) {
        // console.log('err', err);
        // res.json({
        //   status: 'Error',
        //   msg: 'Error',
        // });
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    },
  );
});

router.post('/jobseeker/add/salary/:userId', async (req, res) => {
  const request = {
    params: req.params,
    body: req.body,
  };

  kafka.make_request(
    'indeed_add_jobseekerInfo_salary',
    request,
    (error, results) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(results);
      }
    },
  );
});

module.exports = router;
