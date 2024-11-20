import express from 'express';
import { postAddressController, getAddressController } from '../controllers/addressController.js';

const router = express.Router();

router.post('/post', postAddressController);
router.get('/get', getAddressController);

export default router;
