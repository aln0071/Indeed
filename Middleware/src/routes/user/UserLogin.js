const router = require('express').Router();
const bcrypt = require('bcrypt');
const { executeQuery } = require('../../utils');
const { _login } = require('../../utils/query');

router.post('/UserLogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await executeQuery(_login, { email });
    if (response.length === 0) {
      throw new Error('Invalid credentials');
    } else {
      const userData = response[0];
      const isValidUser = await bcrypt.compare(password, userData.password);
      if (isValidUser) {
        delete userData.password;
        res.json(userData);
      } else {
        throw new Error('Invalid credentials');
      }
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
