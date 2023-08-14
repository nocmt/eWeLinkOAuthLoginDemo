import eWeLink from 'ewelink-api-next'

// https://dev.ewelink.cc/
// Login
// Apply to become a developer
// Create an application

export const client = new eWeLink.WebAPI({
  appId: '', // App ID, which needs to be configured in the eWeLink open platform
  appSecret: '', // App Secret, which needs to be configured in the eWeLink open platform
  region: 'eu', //Feel free, it will be automatically updated after login
  requestRecord: true, // Request record, default is false
  // logObj: console, // Log object, default is console
})

export const redirectUrl = 'http://127.0.0.1:8000/redirectUrl' // Redirect URL, which needs to be configured in the eWeLeLink open platform

// Generate random strings
export const randomString = (length) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < length; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
