const AppError = require("../error/AppError");
const userRepository = require("../repository/userRepository");
const handleToken = require("../utils/handleToken");
const textContent = require("../utils/textContent");

const smeRequest = async (req, res, next) => {
  const { findByAnyKey } = userRepository();
  try {
    const result = await findByAnyKey({ key: 'smeProfile.status', value: 'review in progress' })
  res.status(200).json(result);
  } catch (error) {
    if(error instanceof AppError) return next(error);
    throw new Error(error.message);
  }
}

const smeAllow = async (req, res, next) => {
  const { id } = req.body;
  if(!id) throw new AppError(textContent.error.missingId)
  const { smeAllow } = userRepository();
  try {
    const result = await smeAllow({ id });
    const { sign } = handleToken();
    const token = sign({ user: result });
    result.password = undefined;
    res.status(200).json({ result, token });
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  smeRequest,
  smeAllow,
 };