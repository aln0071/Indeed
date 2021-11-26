const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// import helmet for extra security
const helmet = require('helmet');

// import morgan for loging
const morgan = require('morgan');

const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const review = require('./routes/reviews/Reviews');
const jobs = require('./routes/jobs/Jobs');
const company = require('./routes/company/Company');
const userRegistration = require('./routes/user/UserRegistration');
const userLogin = require('./routes/user/UserLogin');

// add Helmet for extra security
app.use(helmet());

app.use(fileUpload());

// adding morgan to log HTTP requests
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));

const jobSeekerProfile = require('./routes/profile/JobSeekerProfile');
const fileStore = require('./routes/resume-upload/fileStore');

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
app.use('/indeed/api', jobs);
app.use('/indeed/api', company);
app.use('/indeed/user', userRegistration);
app.use('/indeed/user', userLogin);
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
