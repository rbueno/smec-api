
const AppError = require('../error/AppError');
const postRepository = require('../repository/postRepository');
const fetchPostService = require('../services/fetchPostService');
const postService = require('../services/postService');
const textContent = require('../utils/textContent');

const find = async (req, res, next) => {
const { find } = postRepository();
try {
  const result = await find();
  res.status(200).json(result);
} catch (error) {
  if(error instanceof AppError) next(error);
  throw new Error(error.message);
}

}
const findByURL = async (req, res, next) => {
  if(!req.body.url) throw new AppError(textContent.error.missingField)
  
  try {
    const result = await fetchPostService({ data: { url: req.body.url, user: req.user } });
    res.status(200).json(result)
  } catch (error) {
    if(error instanceof AppError) next(error);
    throw new Error(error.message);
  }
}
const stampIt = async (req, res, next) => {
  const { postId } = req.body;
  if(!postId) throw new AppError(textContent.error.missingField)
  const { addStamp } = postService();
  try {
    const result = await addStamp({ postId, userId: req.user.id });
    res.status(200).json(result)
  } catch (error) {
    if(error instanceof AppError) next(error);
    throw new Error(error.message);
  }
}

const stampRemove = async (req, res, next) => {
  const { postId } = req.body;
  if(!postId) throw new AppError(textContent.error.missingField)
  const { removeStamp } = postService();
  try {
    const result = await removeStamp({ postId, userId: req.user.id });
    res.status(200).json(result)
  } catch (error) {
    if(error instanceof AppError) next(error);
    throw new Error(error.message);
  }
}

const postRemove = async (req, res, next) => {
  console.log('postid', req.body.postId)
  const { postId } = req.body;
  if(!postId) throw new AppError(textContent.error.missingField)
  const { removePost } = postService();
  try {
    const result = await removePost({ postId, userId: req.user.id });
    res.status(200).json(result)
  } catch (error) {
    if(error instanceof AppError) next(error);
    throw new Error(error.message);
  }
}
module.exports = {
  find,
  findByURL,
  stampIt,
  stampRemove,
  postRemove
 };