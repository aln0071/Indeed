const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const { uploadFile } = require('../../utils/s3');

const unlink = util.promisify(fs.unlink);

const upload = multer({ dest: 'src/uploads/' });

router.post('/upload/images', upload.array('image', 5), async (req, res) => {
  try {
    const uploadedFiles = await Promise.all(
      req.files.map((file) => uploadFile(file)),
    );
    await Promise.all(req.files.map((file) => unlink(file.path)));
    res.json(uploadedFiles.map((file) => file.key));
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post('/upload/resume', upload.single('resume'), async (req, res) => {
  try {
    const uploadedFile = await uploadFile(req.file);
    unlink(req.file.path);
    res.json({
      fileKey: uploadedFile.key,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
