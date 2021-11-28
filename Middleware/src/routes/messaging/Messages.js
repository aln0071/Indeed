const router = require('express').Router();
const kafka = require('../../kafka/Client');
const redisCli = require('../../redis/Connection');

router.post('/chatRooms', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_create_room', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

router.get('/chatRooms/user/:userId', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_get_rooms', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      if (results) {
        const { url } = req;
        redisCli.setex(url, 3600, JSON.stringify(results));
      }
      res.status(200).send(results);
    }
  });
});

router.get('/chatRoom/:chatRoomId/messages', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_get_messages', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

router.post('/messages', async (req, res) => {
  const request = {
    query: req.query,
    params: req.params,
    body: req.body,
  };

  kafka.make_request('indeed_create_message', request, (error, results) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

module.exports = router;
