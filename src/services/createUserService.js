const bcrypt = require('bcrypt');
const AppError = require('../error/AppError');
const userRepository = require('../repository/userRepository');
const handleToken = require('../utils/handleToken');
const textContent = require('../utils/textContent');

const createUserService = async ({ userData }) => {
  const { create, findByAnyKey } = userRepository();
  
    const user = await findByAnyKey({ key: 'email', value: userData.email })
    if (user) throw new AppError(textContent.error.userEmailAlreadyExist);

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);

    const userToCreate = {
      ...userData,
      password: hashPassword,
    };

    let createdUser = {};
    try {
      const result = await create({ userData: userToCreate });
      createdUser = result;
    } catch (error) {
      throw new AppError(error || textContent.error.unexpected);        
    }

    const { sign } = handleToken();
    const token = sign({ user: createdUser });

    delete createdUser.password;
    return { user: createdUser, token }
}
module.exports = createUserService;