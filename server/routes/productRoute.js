import express from 'express';
import { addProductController, getProductController } from '../controllers/productController.js';

const router = express.Router();

router.post('/post', addProductController);
router.get('/', getProductController);

export default router;
