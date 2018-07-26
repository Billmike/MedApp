import express from 'express';
import StaffController from '../controllers/staff.controllers';

const router = express.Router();

router.post('/signup', StaffController.staffSignup);
router.post('/signin', StaffController.staffSignin);

export default router;
