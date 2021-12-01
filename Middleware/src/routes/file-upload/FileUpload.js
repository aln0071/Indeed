const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const { uploadFile } = require('../../utils/s3');
const kafka = require('../../kafka/Client');

const unlink = util.promisify(fs.unlink);

const upload = multer({ dest: 'src/uploads/' });

router.post('/upload/images', upload.array('image', 5), async (req, res) => {
  try {
    const uploadedFiles = await Promise.all(
      req.files.map((file) => uploadFile(file)),
    );
    const { userId, caption, location } = req.body;
    uploadedFiles.map((file) => file.key);
    const request = uploadedFiles.map((file, index) => ({
      userId,
      pictureKey: file.key,
      caption: Array.isArray(caption) ? caption[index] : caption,
      location: Array.isArray(location) ? location[index] : location,
    }));
    // upload details to pictures model
    const response = await new Promise((resolve, reject) => {
      kafka.make_request('indeed_add_pictures', request, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    await Promise.all(req.files.map((file) => unlink(file.path)));
    res.json(response);
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
