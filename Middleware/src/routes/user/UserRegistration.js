const router = require('express').Router();
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { executeQuery } = require('../../utils');
const { _register } = require('../../utils/query');

const saltRounds = 10;

router.post('/UserRegistration', async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    const userId = uuid.v1();
    const encryptedPass = await bcrypt.hash(password, saltRounds);
    const result = await executeQuery(_register, {
      userId,
      email,
      password: encryptedPass,
      userType,
    });
    res.status(200).send(result);
  } catch (error) {
    if (String(error.message).startsWith('ER_DUP_ENTRY')) {
      res.status(400).send({ error: 'Email Id is already registered' });
    } else {
      res.status(500).send({ error: error.message });
    }
  }
});

module.exports = router;
