import express from 'express';
import { updateProfile, getUserSettings } from '../controllers/settingController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

const router = express.Router();

router.get('/settings', isAuthenticated, getUserSettings);
router.put('/setting/chenge-profile', isAuthenticated, upload.single('profilePhoto'), updateProfile);

export default router;
