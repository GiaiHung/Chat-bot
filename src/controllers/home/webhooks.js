import request from 'request'
import {
  handleGetStarted,
  handleMainMenu,
  handleReserve,
  handleSendGuidance,
  handleSendMedicalProduct,
} from '../../services/chatbot/sendTemplates'

const getWebhooks = async (req, res) => {
  const verifyToken = process.env.VERIFY_TOKEN
  let mode = req.query['hub.mode']
  let token = req.query['hub.verify_token']
  let challenge = req.query['hub.challenge']

  if (mode && token) {
    if (mode === 'subscribe' && token === verifyToken) {
      res.status(200).send(challenge)
    } else {
      res.sendStatus(403)
    }
  }
}

const postWebhooks = async (req, res) => {
  let body = req.body

  console.log(`\u{1F7EA} Received webhook:`)
  console.dir(body, { depth: null })
  if (body.object === 'page') {
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0]
      console.log(webhook_event)

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message)
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback)
      }
    })
    res.status(200).send('EVENT_RECEIVED')
  } else {
    res.sendStatus(404)
  }
}

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response
  // Check message from quick reply
  const quick_reply = received_message.quick_reply
  if (quick_reply && quick_reply.payload) {
    if (quick_reply.payload === 'MAIN_MENU') {
      handleMainMenu(sender_psid)
    }
    if (quick_reply.payload === 'GUIDANCE') {
      handleSendGuidance(sender_psid)
    }

    return
  }

  // Checks if the message contains text
  if (received_message.text) {
    response = {
      text: `You sent the message: "${received_message.text}". Now send me an attachment!`,
    }
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url
    response = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [
            {
              title: 'Is this the right picture?',
              subtitle: 'Tap a button to answer.',
              image_url: attachment_url,
              buttons: [
                {
                  type: 'postback',
                  title: 'Yes!',
                  payload: 'yes',
                },
                {
                  type: 'postback',
                  title: 'No!',
                  payload: 'no',
                },
              ],
            },
          ],
        },
      },
    }
  }

  // Send the response message
  callSendAPI(sender_psid, response)
}

// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
  let response

  // Get the payload for the postback
  let payload = received_postback.payload

  // Set the response based on the postback payload
  switch (payload) {
    case 'GET_STARTED':
    case 'RESTART_BOT':
      await handleGetStarted(sender_psid)
      break
    case 'MAIN_MENU':
    case 'RETURN_HOME_SCREEN':
      handleMainMenu(sender_psid)
      break
    case 'RESERVE':
      handleReserve(sender_psid)
    case 'GUIDANCE':
      handleSendGuidance(sender_psid)
      break
    case 'MEDICAL_PRODUCT':
      handleSendMedicalProduct(sender_psid)
      break
    default:
      response = {
        text: `Oops! I don't know response with postback ${payload}`,
      }
      callSendAPI(sender_psid, response)
  }
}

// Sends response messages via the Send API
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
      qs: { access_token: process.env.ACCESS_TOKEN },
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

export { getWebhooks, postWebhooks }
