import express from 'express'
import { getHomePage, getWebhooks, postWebhooks } from '../controllers/home'

const router = express.Router()

router.get('/', getHomePage)
router.get('/webhook', getWebhooks)
router.get('/messaging-webhook', postWebhooks)

export default router
