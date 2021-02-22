const User = require('../models/User');
const AppError = require('../error/AppError');
const textContent = require('../utils/textContent');

function userRepository(data) {
  async function create({ userData }) {
    const newUser = new User(userData)
    try {
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new AppError(textContent.error.createNewUser);      
    }
  }
  async function findByAnyKey({ key, value }) {

    try {
      const result = await User.findOne({[key]: value })
      return result;
    } catch (error) {
      throw new AppError(textContent.error.findOneUser);
    }
  }

  async function find() {

    try {
      const result = await User.find()
      return result;
    } catch (error) {
      throw new AppError(textContent.error.listUsers);
    }
  }

  async function findById({ id }) {

    try {
      const result = await User.findById(id)
      return result;
    } catch (error) {
      throw new AppError(textContent.error.findOneUser);
    }
  }

  async function findByIdAndUpdate({ id, data }) {
    try {
      const result = await User.findByIdAndUpdate(id, { ...data }, { new: true });
      return result
    } catch (error) {
      throw new AppError(textContent.error.userNotUpdated);      
    }
  }

  async function smeAllow({ id }) {
    try {
      const result = await User.findOneAndUpdate({ _id: id }, { $set: { 'smeProfile.status': 'approved' }, $push: { role: 'sme' } }, { useFindAndModify: false, new: true });
      return result
    } catch (error) {
      if (error.name === 'MongoError') console.log('MongoDB error', error);
      throw new AppError(textContent.error.userNotUpdated);      
    }
  }

  return {
    create,
    findByAnyKey,
    find,
    findById,
    findByIdAndUpdate,
    smeAllow,
  }
}
module.exports = userRepository;