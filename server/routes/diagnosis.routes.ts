import express from 'express';
import DiagnosisController from '../controllers/diagnosis.controller';

const router = express.Router();

router.post('/add/:patientID', DiagnosisController.addDiagnosis);

export default router;
