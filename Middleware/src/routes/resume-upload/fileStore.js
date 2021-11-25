const express = require('express');

const router = express.Router();
const { upload } = require('./fileUpload');

router.post('/resumeupload/:entity', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send({ fileURL: req.file.location });
});

module.exports = router;
