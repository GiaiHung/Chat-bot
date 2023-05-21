import request from 'request'
require('dotenv').config()

const access_token = process.env.ACCESS_TOKEN

async function callSendAPI(sender_psid, response) {
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  }

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token },
      method: 'POST',
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log('message sent!')
      } else {
        console.error('Unable to send message:' + err)
      }
    }
  )
}

const handleGetStarted = async (sender_psid) => {
  const username = getUserProfile(sender_psid)
  console.log('Check handle get started', username)
  const response = { text: `Chào mừng ${username} đến với Booking Care` }
  await callSendAPI(sender_psid, response)
}

const getUserProfile = (sender_psid) => {
  return new Promise((resolve, reject) => {
    request(
      {
        uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${access_token}`,
        method: 'GET',
      },
      (err, res, body) => {
        if (!err) {
          body = JSON.parse(body)
          let username = `${body.last_name} ${body.first_name}`
          console.log('Check get user profile', username)
          resolve(username)
        } else {
          console.error('Unable to send message:' + err)
          reject(err)
        }
      }
    )
  })
}

export { handleGetStarted }
