import request from 'request'

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
      uri: `https://graph.facebook.com/v16.0/me/messenger_profile?access_token=${process.env.ACCESS_TOKEN}`,
      qs: { access_token: process.env.ACCESS_TOKEN },
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

export { getHomePage, setupProfile }
