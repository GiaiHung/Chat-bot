import express from 'express'
import { getHomePage, setupProfile } from '../controllers/home'
import { getWebhooks, postWebhooks } from '../controllers/home/webhooks'

const router = express.Router()

router.get('/', getHomePage)
router.get('/webhook', getWebhooks)
router.post('/webhook', postWebhooks)
router.post('/setup-profile', setupProfile)

export default router
