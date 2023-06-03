import request from 'request'
require('dotenv').config()

const access_token = process.env.ACCESS_TOKEN

async function callSendAPI(sender_psid, response) {
  return new Promise(async (resolve, reject) => {
    try {
      let request_body = {
        recipient: {
          id: sender_psid,
        },
        message: response,
      }

      await handleMarkReadMessage(sender_psid)
      await handleSendTyping(sender_psid)

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
            resolve('message sent!')
          } else {
            console.error('Unable to send message:' + err)
          }
        }
      )
    } catch (error) {
      reject(error)
    }
  })
}

async function handleSendTyping(sender_psid) {
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    sender_action: 'typing_on',
  }

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: `https://graph.facebook.com/VERSION/PAGE-ID/messages?access_token=${access_token}`,
      qs: { access_token },
      method: 'POST',
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log('Typing on sent!')
      } else {
        console.error('Unable to send typing on:' + err)
      }
    }
  )
}

async function handleMarkReadMessage(sender_psid) {
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    sender_action: 'mark_seen',
  }

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: `https://graph.facebook.com/VERSION/PAGE-ID/messages?access_token=${access_token}`,
      qs: { access_token },
      method: 'POST',
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log('Typing on sent!')
      } else {
        console.error('Unable to send typing on:' + err)
      }
    }
  )
}

export { callSendAPI, handleSendTyping, handleMarkReadMessage }
