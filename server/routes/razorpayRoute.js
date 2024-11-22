import express from 'express';
import { razorpayOrderController, razorpayOrderValidateController } from '../controllers/razorpayController.js';
import { authenticate } from '../middleware/middleware.js';

const router = express.Router();

router.post('/', razorpayOrderController);
router.post('/validate' ,razorpayOrderValidateController);

export default router;
