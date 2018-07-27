import express from 'express';
import DiagnosisController from '../controllers/diagnosis.controller';
import SessionHelper from '../helpers/session.helpers';

const router = express.Router();

router.post('/add/:patientID', SessionHelper.hasToken, DiagnosisController.addDiagnosis);

export default router;
