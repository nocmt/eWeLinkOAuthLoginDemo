import eWeLink from 'ewelink-api-next'

// https://dev.ewelink.cc/
// Login
// Apply to become a developer
// Create an application

const _config = {
  appId: '', // App ID, which needs to be configured in the eWeLink open platform
  appSecret: '', // App Secret, which needs to be configured in the eWeLink open platform
  region: 'eu', //Feel free, it will be automatically updated after login
  requestRecord: true, // Request record, default is false
  // logObj: console, // Log object, default is console
}

if (!_config.appId || !_config.appSecret) {
  throw new Error('Please configure appId and appSecret')
}

export const client = new eWeLink.WebAPI(_config)
export const wsClient = new eWeLink.Ws(_config);

export const redirectUrl = 'http://127.0.0.1:8000/redirectUrl' // Redirect URL, which needs to be configured in the eWeLeLink open platform

// Generate random strings
export const randomString = (length) => {
  return [...Array(length)].map(_=>(Math.random()*36|0).toString(36)).join('');
}

