/* eslint-disable linebreak-style */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const dotenv = require('dotenv');

dotenv.config();

// import helmet for extra security
const helmet = require('helmet');

// import morgan for loging
const morgan = require('morgan');

const app = express();

// passport jwt
const passport = require('passport');

app.use(passport.initialize());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// add Helmet for extra security
app.use(helmet());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.use(cors());

const review = require('./routes/reviews/Reviews');
const jobs = require('./routes/jobs/Jobs');
const company = require('./routes/company/Company');
const userRegistration = require('./routes/user/UserRegistration');
const userLogin = require('./routes/user/UserLogin');
const getUserDetails = require('./routes/user/GetUserDetails');
const jobSeekerProfile = require('./routes/profile/JobSeekerProfile');
const fileUpload = require('./routes/file-upload/FileUpload');
const fileDownload = require('./routes/file-download/FileDownload');
const messages = require('./routes/messaging/Messages');
const uploadPhotos = require('./routes/company/UploadPhotos');
const userProfileUpdate = require('./routes/user/UserProfileUpdate');
const { generateAccessToken, authWithPassport } = require('./utils');

app.use('/indeed/api', review);
app.use('/indeed/api', jobs);
app.use('/indeed/api', company);
app.use('/indeed/user', userRegistration);
app.use('/indeed/user', userLogin);
app.use('/indeed/user', getUserDetails);
app.use('/indeed/api', jobSeekerProfile);
app.use('/indeed/files', fileUpload);
app.use('/indeed/files', fileDownload);
app.use('/indeed/api', messages);
app.use('/indeed/api', uploadPhotos);
app.use('/indeed/api', userProfileUpdate);

app.get('/auth', async (req, res) => {
  const key = await generateAccessToken('test');
  res.json({
    response: key,
  });
});

app.get('/', (req, res) => {
  res.send('hello');
});

const { PORT } = process.env;

authWithPassport();

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`); //eslint-disable-line
});

module.exports = app;
