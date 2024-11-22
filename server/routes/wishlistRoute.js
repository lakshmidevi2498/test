import express from 'express';
import { postWishlist, getWishlist, deleteWishlist } from '../controllers/wishlistController.js';
import { authenticate } from '../middleware/middleware.js';

const router = express.Router();

router.post('/post', authenticate,postWishlist);
router.get('/get',authenticate, getWishlist);
router.delete('/delete', authenticate,deleteWishlist);

export default router;
