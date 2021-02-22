const AppError = require('../error/AppError');
const postRepository = require('../repository/postRepository');
const textContent = require('../utils/textContent');
const urlMetadata = require('url-metadata')

const setPostContentProperties = ({ metadata }) => {
  return {
    url: metadata.url,
    canonical: metadata.canonical,
    title: metadata.title,
    mainImageURL: metadata.image,
    keywords: metadata.keywords,
    source: metadata.source,
    description: metadata.description,
  }
}

async function fecthURLData ({ data }) {
  return new Promise((resolve, reject) => {
    urlMetadata(data.url).then(
      metadata => resolve(setPostContentProperties({ metadata })),
      error => reject(error))
  })
}

const fetchPostService = async ({ data }) => {
  const { findByURL, create } = postRepository();
  const post = await findByURL({ url: data.url });
  if (post.alreadyPublished) {
    return {
      result: {
        message: textContent.process.postPreviouslyPublished,
        data: post,
      }
    }
  }
  
  const fetchResult = await fecthURLData({ data })
  const newsPostProperies = {
    ...fetchResult,
    createdBy: data.user.id,
    sme: [data.user.id],
  }
  const result = await create({ userData: { ...newsPostProperies } })
  return result;
}
module.exports = fetchPostService;