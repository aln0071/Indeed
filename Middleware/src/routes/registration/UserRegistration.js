const router = require('express').Router();
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const con = require('../../dbConn/DbConnection');

const saltRounds = 10;

router.post('/UserRegistration', async (req, res) => {
  console.log(req.body);
  const { email, password, userType } = req.body;
  const userId = uuid.v1();

  const query1 = 'INSERT INTO UserTable(userId, password, email,  userType) VALUES ( ?, ?, ?, ?)';
  const encryptedPass = await bcrypt.hash(password, saltRounds);

  con.query(query1, [userId, encryptedPass, email, userType], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(400).send({ error: 'Email Id is already registered' });
      } else {
        res.status(500).send({ error: 'Unknow internal server error' });
      }
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
