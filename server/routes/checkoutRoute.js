import express from 'express';
import { 
    updateSuccessOrderController, 
    checkoutPostController, 
    checkoutGetController, 
    checkoutDeleteController, 
    updateCheckoutController 
} from '../controllers/checkoutController.js';
import { authenticate } from '../middleware/middleware.js';

const router = express.Router();

router.post('/post', authenticate,checkoutPostController);
router.get('/get', authenticate,checkoutGetController);
router.delete('/delete',checkoutDeleteController);
// router.patch('//order', updateCheckoutController);
router.delete('/',updateSuccessOrderController);

export default router;
