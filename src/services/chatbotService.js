import request from 'request'
require('dotenv').config()

const access_token = process.env.ACCESS_TOKEN

function callSendAPI(sender_psid, response) {
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
  const response = { text: 'Chào mừng đến với Booking Care' }
  await callSendAPI(sender_psid, response)
}

export { handleGetStarted }
