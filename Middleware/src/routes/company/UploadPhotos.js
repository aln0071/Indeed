const router = require('express').Router();
const kafka = require('../../kafka/Client');

// need to get company id in this request to add it to database
router.post('/uploadCompanyPhotos/:companyId', async (req, res) => {
  const { companyId } = req.params;
  const pictures = req.body;
  try {
    kafka.make_request(
      'indeed_put_company',
      { body: { companyId, pictures } },
      (error, results) => {
        if (error) {
          res.status(400).send(error);
        } else {
          res.status(200).send(results);
        }
      },
    );
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
