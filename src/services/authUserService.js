const bcrypt = require('bcrypt');
const AppError = require('../error/AppError');
const userRepository = require('../repository/userRepository');
const handleToken = require('../utils/handleToken');
const textContent = require('../utils/textContent');

const authUserService = async ({ email, password }) => {
  const { findByAnyKey } = userRepository();
  let user = await findByAnyKey({ key: 'email', value: email });
  if (!user) throw new AppError(textContent.error.authNotMath);

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if(!isPasswordCorrect) throw new AppError(textContent.error.authNotMath);

  const { sign } = handleToken();
  const token = sign({ user });
  user.password = undefined;
  return { user, token }
  
}

module.exports = authUserService;