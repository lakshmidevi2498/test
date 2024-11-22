import express from 'express';
 const router = express.Router()
 import {cartController ,getCartController , deleteCartController} from '../controllers/cartController.js'
import { authenticate } from '../middleware/middleware.js';
 
  router.post('/post',authenticate,cartController)
  router.get('/get' , authenticate,getCartController)
  router.delete('/delete',authenticate,deleteCartController)

  export default router;