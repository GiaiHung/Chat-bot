import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initRouter from './routes/initRouter'
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Config view engine
viewEngine(app)

// Config routes
initRouter(app)

// Body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, () => {
  console.log('App is listening on port', PORT)
})
