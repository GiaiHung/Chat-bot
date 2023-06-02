import express from 'express'
import { getReserver, postReserve } from '../controllers/reserve'

const router = express.Router()

router.get('/:id', getReserver)
router.post('/reserve-booking-ajax', postReserve)

export default router
