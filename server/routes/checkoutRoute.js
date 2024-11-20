import express from 'express';
import { 
    updateSuccessOrderController, 
    checkoutPostController, 
    checkoutGetController, 
    checkoutDeleteController, 
    updateCheckoutController 
} from '../controllers/checkoutController.js';

const router = express.Router();

router.post('/post', checkoutPostController);
router.get('/get', checkoutGetController);
router.delete('/delete', checkoutDeleteController);
router.patch('//order', updateCheckoutController);
router.delete('/', updateSuccessOrderController);

export default router;
