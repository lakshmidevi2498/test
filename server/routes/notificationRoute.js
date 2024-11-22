import express from 'express';
import {notificationPostController , sendNotificationController} from '../controllers/notificationController.js'
import { authenticate } from '../middleware/middleware.js';

const router = express.Router();

router.post('/', notificationPostController);
router.post('/send-notification', sendNotificationController)


export default router;
