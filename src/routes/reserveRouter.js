import express from 'express'
import { getReserver } from '../controllers/reserve'

const router = express.Router()

router.get('/', getReserver)

export default router
