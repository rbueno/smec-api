const jwt = require('jsonwebtoken');

const handleToken = () => {
  function sign({ user }) {
    return jwt.sign({
      userId: user._id,
      role: user.role,
    }, process.env.JWTHASH,{
      algorithm: 'HS256',
      expiresIn: '7d',
    })
  }

  function verify({ token }) {
    return jwt.verify(token, process.env.JWTHASH);
  }

  return {
    sign,
    verify,
  }
}

module.exports = handleToken;