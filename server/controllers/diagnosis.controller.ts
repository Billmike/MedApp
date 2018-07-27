import { Request, Response } from 'express';
import diagnosisModel from '../models/diagnosis.model';

class Diagnosis {
  static addDiagnosis(request: Request, response: Response) {
    diagnosisModel.create({
      diagnosis: request.body.diagnosis,
      reason: request.body.reason,
      tests: request.body.tests,
      surgery: request.body.surgery,
      patientID: request.params.patientID
    }).then((diagnosis) => {
      return response.status(201).json({
        message: 'Record saved successfully',
        diagnosis
      });
    }).catch((error) => {
      return response.status(500).json({
        message: error.message
      });
    });
  }
}

export default Diagnosis;
