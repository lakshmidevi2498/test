import express from 'express';
 const router = express.Router()
 import {cartController ,getCartController , deleteCartController} from '../controllers/cartController.js'
 
  router.post('/post',cartController)
  router.get('/get' , getCartController)
  router.delete('/delete',deleteCartController)

  export default router;