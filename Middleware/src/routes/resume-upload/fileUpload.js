const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const bucketName = 'userprofileresume';
const region = 'us-east-2';

const awsAccessKey = process.env.awsSecretKey;
const { awsSecretKey } = process.env;

console.log(awsSecretKey);

const s3 = new aws.S3({
  region,
  awsAccessKey,
  awsSecretKey,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: 'testing' });
    },
    key(req, file, cb) {
      const ext = file.mimetype.split('/')[1];
      const imagePath = `${req.params.entity}/${Date.now().toString()}.${ext}`;
      cb(null, imagePath);
    },
  }),
});

module.exports = upload;
