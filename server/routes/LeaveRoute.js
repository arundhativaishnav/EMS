import express from 'express';
import authmiddleware from '../middleware/authmiddleware.js';
import {AddLeave ,getLeaves } from '../contollers/LeaveController.js';


const router = express.Router();

router.post('/add', authmiddleware, AddLeave);
router.get('/:id', authmiddleware,getLeaves);

export default router;
