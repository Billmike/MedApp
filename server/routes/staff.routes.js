import express from 'express';
import StaffController from '../controllers/staff.controllers';

const router = express.Router();

router.post('/signup', StaffController.staffSignup);

export default router;
