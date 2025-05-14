import express from 'express';
import authmiddleware from '../middleware/authmiddleware.js';
import {createNotification , getNotifications } from '../controllers/notificationController.js';

const router = express.Router();

router.post('/' , authmiddleware , createNotification);
router.get('/' , authmiddleware , getNotifications);



export default router;