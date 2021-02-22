const AppError = require("../error/AppError");
const userRepository = require("../repository/userRepository");
const authLinkedInService = require("../services/authLinkedInService");
const authUserService = require("../services/authUserService");
const createUserService = require("../services/createUserService");
const textContent = require("../utils/textContent");
const userCheckerService = require("../services/userCheckerService");

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) throw new AppError(textContent.error.allFieldAreMandatory);
  const result = await createUserService({ userData: { username, email, password } })
  res.status(200).json(result);
}

const getAll = async (req, res) => {
  const { find } = userRepository();
  const result = await find();
  res.status(200).json(result);
}

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if(!email || !password) throw new AppError(textContent.error.allFieldAreMandatory);
  
  try {
    const result = await authUserService({ email, password });
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof AppError) return next(error)
    throw new Error(error.message);
  }
}

const applysme = async (req, res) => {
  const { isApplicableToSME } = userCheckerService({ user: req.user })
  const result = await isApplicableToSME();
  res.status(200).json(result)
}

const linkedInCallback = async (req, res) => {
  const result = await authLinkedInService({ query: req.query, user: req.user });
  res.status(200).json(result);
}
module.exports = {
  createUser,
  getAll,
  login,
  applysme,
  linkedInCallback,
 };