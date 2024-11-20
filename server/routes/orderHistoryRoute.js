import express from 'express'
import { getOrderHistoryController ,updateOrderHistoryController } from '../controllers/orderHistoryController.js'
const router = express.Router()

router.get('/',getOrderHistoryController)
router.put('/update',updateOrderHistoryController)

export default router;