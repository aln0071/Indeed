const router = require('express').Router();
const { getFileStream } = require('../../utils/s3');

// get image from s3
router.get('/images/:key', async (req, res) => {
  const { key } = req.params;
  const readStream = await getFileStream(key);
  readStream.on('error', (error) => {
    res.json({
      error: error.message,
    });
    res.end();
  });
  return readStream.pipe(res);
});

module.exports = router;
