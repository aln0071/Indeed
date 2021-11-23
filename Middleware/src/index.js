const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// import helmet for extra security
const helmet = require('helmet');

// import morgan for loging
const morgan = require('morgan');

const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
const UserRegistration = require('./Registration/UserRegistration');

const app = express();
app.use(express.json());

app.use(bodyParser.json());

// add Helmet for extra security
app.use(helmet());

// adding morgan to log HTTP requests
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));

const review = require('./Reviews/Reviews');
const jobSeekerProfile = require('./Profile/JobSeekerProfile');
const fileStore = require('./ResumeUpload/fileStore');

app.use(busboy());
app.use(busboyBodyParser());

app.use(cors());

// var corsOptions = {  //eslint-disable-line
//     origin: "http://localhost:3000" //eslint-disable-line
//   }; //eslint-disable-line

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("connected");
// })

app.use('/indeed/api', review);
app.use('/indeed/user', UserRegistration);
app.use('/indeed/api', jobSeekerProfile);
app.use('/indeed/api', fileStore);

app.get('/', (req, res) => {
  res.send('hello');
});

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`); //eslint-disable-line
});

module.exports = app;
