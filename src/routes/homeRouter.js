import express from 'express'
import {
  getHomePage,
  setupPersistentMenu,
  setupProfile,
} from '../controllers/home'
import { getWebhooks, postWebhooks } from '../controllers/home/webhooks'
import { getGoogleSheet } from '../controllers/excel'

const router = express.Router()

router.get('/', getHomePage)
router.get('/excel', getGoogleSheet)
router.get('/webhook', getWebhooks)
router.post('/webhook', postWebhooks)

// Get started button, whitelisted domains
router.post('/setup-profile', setupProfile)

// Persistence menu
router.post('/setup-persistent-menu', setupPersistentMenu)

export default router
