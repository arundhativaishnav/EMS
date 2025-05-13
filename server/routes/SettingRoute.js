import express from 'express';
import { updateProfile, getUserSettings } from '../contollers/settingController.js';
import authmiddleware from '../middleware/authmiddleware.js';
import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // ✅ fixed typo here
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', authmiddleware, getUserSettings);
router.put('/change-profile', authmiddleware, upload.single('profilePhoto'), updateProfile);

export default router;
