import express from 'express';
import PatientController from '../controllers/patient.controller';
import SessionHelper from '../helpers/session.helpers';

const router = express.Router();

router.post('/register', SessionHelper.hasToken, PatientController.registerPatient);
router.get('/details/:healthInsuranceNumber', SessionHelper.hasToken, PatientController.getPatientRecords);

export default router;
