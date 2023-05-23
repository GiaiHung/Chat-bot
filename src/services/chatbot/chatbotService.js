import request from 'request'
import { sendGetStartedTemplate, sendMainMenuTemplate } from './templates'
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
  try {
    const username = getUserProfile(sender_psid)
    const response = sendGetStartedTemplate(username)

    // Send generic template message
    await callSendAPI(sender_psid, response)
  } catch (error) {
    console.log(error)
  }
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
          resolve(username)
        } else {
          console.error('Unable to send message:' + err)
          reject(err)
        }
      }
    )
  })
}

const handleMainMenu = async (sender_psid) => {
  try {
    const response = sendMainMenuTemplate()

    // Send generic template message
    await callSendAPI(sender_psid, response)
  } catch (error) {
    console.log(error)
  }
}

export { handleGetStarted, handleMainMenu }
