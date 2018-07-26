import express from 'express';
import PatientController from '../controllers/patient.controller';

const router = express.Router();

router.post('/register', PatientController.registerPatient);

export default router;
