import express from 'express';
import authmiddleware from '../middleware/authmiddleware.js';
import { adddepartment } from '../contollers/departmentController.js';
import { getDepartments } from '../contollers/departmentController.js';
import { editDepartments } from '../contollers/departmentController.js';

const router = express.Router();

router.get('/department', authmiddleware, getDepartments);
router.post('/add', authmiddleware, adddepartment);
router.get('/:id', authmiddleware, editDepartments); // Assuming you want to fetch a specific department by ID

export default router;