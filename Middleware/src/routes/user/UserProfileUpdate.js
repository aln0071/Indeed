const router = require('express').Router();
const kafka = require('../../kafka/Client');

router.post('/userProfile', async (req, res) => {
  const request = {
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_userprofile_update', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

router.post('/userProfile/deleteResume/:userId', async (req, res) => {
  const request = {
    params: req.params,
    body: req.body,
  };

  kafka.make_request(
    'indeed_userProfile_deleteResume',
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
