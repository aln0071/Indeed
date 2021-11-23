const express = require('express');

const router = express.Router();
const { upload } = require('./fileUpload');

router.post('/file/:entity', upload.single('file'), (req, res) => {
  console.log(res.file);
  res.send({ fileURL: req.file.location });
});

module.exports = router;
