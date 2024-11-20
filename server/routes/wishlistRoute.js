import express from 'express';
import { postWishlist, getWishlist, deleteWishlist } from '../controllers/wishlistController.js';

const router = express.Router();

router.post('/post', postWishlist);
router.get('/get', getWishlist);
router.delete('/delete', deleteWishlist);

export default router;
