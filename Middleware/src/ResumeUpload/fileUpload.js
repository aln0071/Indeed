const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const bucketName = 'userprofileresume';
const region = 'us-east-2';

const { awsAccessKey } = process.env;
const { awsSecretKey } = process.env;

console.log(awsSecretKey);

const s3 = new aws.S3({
  region,
  awsAccessKey,
  awsSecretKey,
});

console.log('hello');
const isImage = (req, file, callbck) => {
  if (file.mimetype.startsWith('image')) {
    callbck(null, true);
  } else {
    callbck(new Error('Only Image is allowed'));
  }
};

const upload = multer({
  fileFilter: isImage,
  storage: multerS3({
    s3,
    bucket: bucketName,
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: 'testing' });
    },
    key(req, file, cb) {
      const ext = file.mimetype.split('/')[1];
      const filePath = `${req.params.entity}/${Date.now().toString()}.${ext}`;
      console.log('hello');
      cb(null, filePath);
    },
  }),
});

exports.upload = upload;
