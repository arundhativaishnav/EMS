import express from 'express';
import { AdminLogin } from '../contollers/authcontroller.js';

const router = express.Router()

router.post('/AdminLogin', AdminLogin)

export default router;

