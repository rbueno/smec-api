const AppError = require('../error/AppError');
const handleToken = require('../utils/handleToken');
const textContent = require('../utils/textContent');

const ensureAuth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  // const authHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDMyZDAwNWU4NjA4MDYwOTU2MWRkM2MiLCJyb2xlIjpbIm9yZGluYXJ5Il0sImlhdCI6MTYxMzk0Mjc5NywiZXhwIjoxNjE0NTQ3NTk3fQ.WLLOFM_wElPdHtIgQdCtoyTg4Nnq6Qc28d6rXJ1H1IA';
  if (!authHeader) throw new AppError(textContent.error.missingToken, 401)

  const token = authHeader.split(' ')[1];
  const { verify } = handleToken();
  try {
    const verifiedToken = verify({ token });
    req.user = { id: verifiedToken.userId, role: verifiedToken.role, token };
    next();
  } catch (error) {
    throw new AppError(textContent.error.expiredOrInvalidToken, 401);
  }
}

module.exports = ensureAuth;