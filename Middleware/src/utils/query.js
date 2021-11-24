module.exports = {
  _login: 'select * from UserTable where email=:email',
  _register:
    'INSERT INTO UserTable(userId, password, email,  userType) VALUES (:userId, :password, :email, :userType)',
};
