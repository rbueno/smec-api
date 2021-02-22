const AppError = require("../error/AppError");
const postRepository = require("../repository/postRepository");
const textContent = require("../utils/textContent");

function postService() {
  
  async function addStamp({ postId, userId }) {
    const { addStamp, findById } = postRepository();
    const post = await findById({ id: postId });
    if(!post) throw new AppError(textContent.error.postNotFound);
    
    const isAlreadyStamped = post.sme.includes(userId);
    if(isAlreadyStamped) throw new AppError(textContent.process.alreadyApprovedThis, 403);
    
    const result = await addStamp({ postId, userId })
    return result;
  }
  async function removeStamp({ postId, userId }) {
    const { removeStamp, findById } = postRepository();
    const post = await findById({ id: postId });
    if(!post) throw new AppError(textContent.error.postNotFound);

    const isAlreadyStamped = post.sme.includes(userId);
    if(!isAlreadyStamped) throw new AppError(textContent.error.noOwnStamp, 403);
    if(post.sme.length === 1) throw new AppError(textContent.error.justOwnStamp, 403);

    const result = await removeStamp({ postId, userId });
    return result;
  }
  async function removePost({ postId, userId }) {
    const { removePost, findById } = postRepository();
    const post = await findById({ id: postId });
    if(!post) throw new AppError(textContent.error.postNotFound);

    const isAlreadyStamped = post.sme.includes(userId);
    if(!isAlreadyStamped) throw new AppError(textContent.error.noOwnStamp, 403);
    if(post.sme.length > 1) throw new AppError(textContent.error.stampedByOrders, 403);

    const result = await removePost({ postId });
    return result;
  }

  return {
    addStamp,
    removeStamp,
    removePost
  }

}

module.exports = postService;