const Post = require('../models/Post');
const AppError = require('../error/AppError');
const textContent = require('../utils/textContent');

function postRepository(data) {
  async function create({ userData }) {
    const newPost = new Post(userData)
    try {
      await newPost.save();
      return newPost;
    } catch (error) {
      throw new AppError(textContent.error.createNewPost);      
    }
  }

  async function findByURL({ url }) {
    try {
      const result = await Post.findOne({ url });
      return { 
        alreadyPublished: !!result, 
        result,
      }
    } catch (error) {
      throw new AppError(textContent.error.postNotFound);
    }
  }

  async function findById({ id }) {
    console.log('o id é:', id);
    try {
      const result = await Post.findById(id);
      return result;
    } catch (error) {
      throw new AppError(textContent.error.postNotFound);
    }
  }

  async function find(){
    try {
      const result = Post.find();
      return result;
    } catch (error) {
      throw new AppError(textContent.error.postNotFound);
    }
  }

  async function addStamp({ postId, userId }) {
    try {
      const result = Post.findByIdAndUpdate(postId, { $push: { sme: userId }}, { new: true });
      return result;
    } catch (error) {
      throw new AppError(textContent.error.stampNotAdded);
    }
  }
  async function removeStamp({ postId, userId}) {
    try {
      const result = Post.findByIdAndUpdate(postId, { $pull: { sme: { $in: [userId] }} }, { new: true });
      return result;
    } catch (error) {
      throw new AppError(textContent.error.stampNotRemoved);
    }
  }

  async function removePost({ postId }) {
    try {
      const result = Post.findByIdAndDelete(postId)
      console.log('after delete doc', result);
      return result;
    } catch (error) {
      throw new AppError(textContent.error.stampNotRemoved);
    }
  }

  return {
    create,
    find,
    findByURL,
    findById,
    addStamp,
    removeStamp,
    removePost
  }
}
module.exports = postRepository;