/* eslint-disable no-shadow */
const mongoose = require('mongoose');
const connection = require('./kafka/Connection');

require('dotenv').config();
const registerCustomer = require('./services/reviews/GetReviews');

const { mongoDB } = require('../Config');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 100,
};

mongoose.connect(mongoDB, options, (err) => {
  if (err) {
    console.log(err);
    console.log('MongoDB Connection Failed');
  } else {
    console.log('MongoDB Connected');
  }
});

function handleTopicRequest(topicName, fname) {
  const consumer = connection.getConsumer(topicName);
  const producer = connection.getProducer();
  consumer.on('message', (message) => {
    console.log(`message received for ${topicName} `, fname);
    console.log(JSON.stringify(message.value));
    const data = JSON.parse(message.value);

    fname.handle_request(data.data, (err, res) => {
      console.log(`after handle${res}`);
      const payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
            error: err,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, (err, data) => {
        console.log(data);
      });
    });
  });
}

handleTopicRequest('indeed.get.reviews', registerCustomer);
