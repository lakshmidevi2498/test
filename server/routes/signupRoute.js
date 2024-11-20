import express from 'express'; 
import { signupController, signinController, signupProfileController, signinProfileController } from '../controllers/signupController.js';
import  {authenticate}  from '../middleware/middleware.js';

const router = express.Router(); 

router.post('/', signupController);
router.post('/signin', signinController);
router.get('/profile', authenticate, signupProfileController);
router.get('/signin/profile', authenticate, signinProfileController);

export default router;
