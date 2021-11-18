/* eslint-disable max-len */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const review = require('./routes/Review');

app.use(cors(
  { exposedHeaders: 'token' },
));

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, resp) => {
  resp.send('Indeed Server Endpoints');
});

const { mongoDB } = require('../Config');

console.log(mongoDB);

app.use('/indeed/api', review);

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

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});

module.exports = app;
