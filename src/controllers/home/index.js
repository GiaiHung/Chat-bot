const getHomePage = (req, res) => {
  res.render('home.ejs')
}

const getWebhooks = async (req, res) => {
  const verifyToken = process.env.VERIFY_TOKEN
  let mode = req.query['hub.mode']
  let token = req.query['hub.verify_token']
  let challenge = req.query['hub.challenge']

  if (mode && token) {
    if (mode === 'subscribe' && token === verifyToken) {
      console.log('WEBHOOK_VERIFIED')
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
    res.status(200).send('EVENT_RECEIVED')
  } else {
    res.sendStatus(404)
  }
}

export { getHomePage, getWebhooks, postWebhooks }
