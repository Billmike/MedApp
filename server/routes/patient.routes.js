import express from 'express';
import PatientController from '../controllers/patient.controller';

const router = express.Router();

router.post('/register', PatientController.registerPatient);
router.get('/details/:healthInsuranceNumber', PatientController.getPatientRecords);

export default router;
