const router = require('express').Router();

// need to get company id in this request to add it to database
router.post('/uploadCompanyPhotos', async (req, res) => {
  try {
    console.log(req.body);
    res.json({
      message: 'Successfully uploaded images',
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
