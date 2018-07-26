import { Request, Response } from 'express';
import patientModel from '../models/patient.model';
import generateUserId from '../helpers/generateUserId.helpers';

/**
 * Patient class
 */
class Patient {
  /**
   * This method is responsible for the registration of patients
   *
   * @memberof Patient
   * @param request The request object
   * @param response The response object
   * 
   * @returns {object} The response object
   */
  static registerPatient(request: Request, response: Response) {
    const randomUserId = generateUserId();
    patientModel.create({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      address: request.body.address,
      state: request.body.state,
      occupation: request.body.occupation,
      placeOfWork: request.body.placeOfWork,
      dateOfBirth: request.body.dateOfBirth,
      maritalStatus: request.body.maritalStatus,
      nextOfKin: request.body.nextOfKin,
      nextOfKinAddress: request.body.nextOfKinAddress,
      relationship: request.body.relationship,
      phoneNumber: request.body.phoneNumber,
      nextOfKinNumber: request.body.nextOfKinNumber,
      photograph: request.body.photograph,
      healthInsuranceNumber: randomUserId,
    }).then((newPatient: any) => {
      if (!newPatient) {
        return response.status(400).json({
          message: 'Something went wrong creating this user'
        });
      }

      return response.status(201).json({
        message: 'Patient created successfully.',
        userDetails: newPatient
      });
    })
      .catch((error) => {
        return response.status(500).json({
          message: error.message
        });
      });
  }

  /**
   * This method handler is responsible for getting patients details
   *
   * @memberof Patient
   * @param request The request object
   * @param response The response object
   * 
   * @returns {object} The response object
   */
  static getPatientRecords(request: Request, response: Response) {
    patientModel.find({ healthInsuranceNumber: request.params.healthInsuranceNumber })
      .then((foundPatient: any) => {
        if (foundPatient.length <= 0) {
          return response.status(400).json({
            message: 'No record for patient with this ID'
          });
        }
        return response.status(200).json({
          message: `Patient with ID number: ${request.params.healthInsuranceNumber} found`,
          userDetails: foundPatient
        });
      }).catch((error) => {
        return response.status(500).json({
          message: 'An error occurred.'
        });
      });
  }
}

export default Patient;
