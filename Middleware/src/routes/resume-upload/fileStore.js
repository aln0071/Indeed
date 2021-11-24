const express = require('express');

const router = express.Router();
const upload = require('./fileUpload');

router.post('/resumeupload/:entity', upload.single('file'), (req, res) => {
  res.send({ fileURL: req.file.location });
});

module.exports = router;
