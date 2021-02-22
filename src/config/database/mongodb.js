const config = {
  dev: process.env.MONGODB_DEV,
  test: process.env.MONGODB_TEST,
  prod: process.env.MONGODB_PROD,
}

module.exports = config;