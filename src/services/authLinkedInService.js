const axios = require('axios');
const qs = require('qs');
const AppError = require("../error/AppError");
const userRepository = require('../repository/userRepository');
const textContent = require("../utils/textContent");

async function getAccessToken({ code }) {
  console.log('chamou getAccessToken', code )
  
  const data = qs.stringify({
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.LINKEDIN_URL_CALLBACK,
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
  })

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data,
    url: 'https://www.linkedin.com/oauth/v2/accessToken',
  };

  try {
    console.log('chamou vai chamar o axios')
    const { data } = await axios(options)
    return data;
  } catch (error) {
    console.log('erro ao chamar getAccesToken', error.message)
  }
}

async function getUserData({ token }) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: 'https://api.linkedin.com/v2/me',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return data;
  } catch (error) {
    console.log('erro getUserData', error)
  }
}


async function authLinkedInService({ query }) {
  const [state, userId] = query.state.split('c3b2a1');
  if (state !== process.env.LINKEDIN_STATE) throw new AppError(textContent.error.csrf);
  if (query.error) throw new AppError(textContent.error.unexpected);

  const accessToken = await getAccessToken({ code: query.code });
  const userData = await getUserData({ token: accessToken.access_token } )
  const linkedInProfile = {
    status: 'review in progress',
    firstName: userData.localizedFirstName,
    lastName: userData.localizedLastName,
    id: userData.id,
  }

  const { findByIdAndUpdate } = userRepository()
  const result = findByIdAndUpdate({ id: userId, data: { smeProfile: { ...linkedInProfile }} });
  return result;
}

module.exports = authLinkedInService;