module.exports = ({ userId }) => {
  return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.LINKEDIN_URL_CALLBACK_URLENCODE}&state=${process.env.LINKEDIN_STATE}c3b2a1${userId}&scope=r_liteprofile%20r_emailaddress`;
}
