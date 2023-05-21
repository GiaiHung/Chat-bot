import request from 'request'
require('dotenv').config()

const access_token = process.env.ACCESS_TOKEN

const getHomePage = (req, res) => {
  res.render('home.ejs')
}

const setupProfile = async (req, res) => {
  let request_body = {
    get_started: { payload: 'GET_STARTED' },
    whitelisted_domains: ['https://bookingcare-messenger.onrender.com'],
  }

  // Send the HTTP request to the Messenger Platform
  await request(
    {
      uri: `https://graph.facebook.com/v16.0/me/messenger_profile?access_token=${access_token}`,
      qs: { access_token: access_token },
      method: 'POST',
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log('Setup user profile successfully')
      } else {
        console.error('Unable to setup profile:' + err)
      }
    }
  )

  res.status(200).send('User profile setup successfully')
}

const setupPersistentMenu = async (req, res) => {
  let request_body = {
    persistent_menu: [
      {
        locale: 'default',
        composer_input_disabled: false,
        call_to_actions: [
          {
            type: 'web_url',
            title: 'Youtube channel Booking Care',
            url: 'https://www.youtube.com/channel/UC9l2RhMEPCIgDyGCH8ijtPQ',
            webview_height_ratio: 'full',
          },
          {
            type: 'web_url',
            title: 'Facebook Channel',
            url: 'https://www.facebook.com/bookingcare',
            webview_height_ratio: 'full',
          },
          {
            type: 'postback',
            title: 'Restart the conversation',
            payload: 'RESTART_BOT',
          },
        ],
      },
    ],
  }

  // Send the HTTP request to the Messenger Platform
  await request(
    {
      uri: `https://graph.facebook.com/v16.0/me/messenger_profile?access_token=${access_token}`,
      qs: { access_token: access_token },
      method: 'POST',
      json: request_body,
    },
    (err, res, body) => {
      console.log(body)
      if (!err) {
        console.log('Persistent menu setup successfully')
      } else {
        console.error('Unable to setup persistent menu' + err)
      }
    }
  )

  res.status(200).send('Persistent menu setup successfully')
}

export { getHomePage, setupProfile, setupPersistentMenu }
