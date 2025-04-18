const jwt = require('jsonwebtoken');
const secret = "Mayank@1234"

function setUser(user) {
  return jwt.sign({
    id: user._id,
    name: user.name,
    email: user.email,
  },secret)
}

function getUser(id) {
    if(!token) return null;
    try {
        return jwt.verify(token, secret)
    }
    catch (error) {
        return null;
    }
}

module.exports = {
  setUser,
  getUser,
};
