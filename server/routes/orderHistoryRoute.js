import express from 'express'
import { getOrderHistoryController ,updateOrderHistoryController } from '../controllers/orderHistoryController.js'
import { authenticate } from '../middleware/middleware.js'
const router = express.Router()

router.get('/',authenticate, getOrderHistoryController)
router.put('/' ,updateOrderHistoryController)

export default router;