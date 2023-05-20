import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initRouter from './routes/initRouter'
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Config view engine
viewEngine(app)

// Config routes
initRouter(app)

app.listen(PORT, () => {
  console.log('App is listening on port', PORT)
})
