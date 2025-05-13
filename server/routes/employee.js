import express from 'express';
import authmiddleware from '../middleware/authmiddleware.js';
import { addEmployee , getEmployees , getEmployeeById , updateEmployee ,fetchEmployeesByDepId } from '../contollers/employeecontroller.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // ✅ fixed typo here
    }
});

const upload = multer({ storage: storage });

// Corrected route
router.post('/add', authmiddleware, upload.single('image'), addEmployee);
router.get('/', authmiddleware, getEmployees);
router.get('/:id', authmiddleware, getEmployeeById);
router.put('/update/:id', authmiddleware, upload.single('image'), updateEmployee);
router.get('/department/:id', authmiddleware, fetchEmployeesByDepId);



export default router;
