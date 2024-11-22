import express from 'express';
import { postAddressController, getAddressController } from '../controllers/addressController.js';
import { authenticate } from '../middleware/middleware.js';

const router = express.Router();

router.post('/post', authenticate, postAddressController);
router.get('/get', authenticate, getAddressController);

export default router;
