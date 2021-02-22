const AppError = require('../error/AppError');
const handleToken = require('../utils/handleToken');
const textContent = require('../utils/textContent');

const ensureSME = async (req, res, next) => {
  const isSME = req.user.role.includes('sme');
  if (!isSME) throw new AppError(textContent.error.Forbidden, 403)
    next();
}

module.exports = ensureSME;