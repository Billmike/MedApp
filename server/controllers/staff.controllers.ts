import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import staffModel from '../models/staff.model';
import generateToken from '../helpers/jwtsign.helper';
import validateSignUp from '../helpers/validateSignup.helpers';

class StaffController {
  static staffSignup(request: Request, response: Response) {

    const { error, valid } = validateSignUp(request.body);
    if (valid >= 1) {
      return response.status(400).send(error);
    }
    staffModel.findOne({ email: request.body.email }).then((foundUser: any) => {
      if (foundUser) {
        return response.status(409).json({
          message: 'This user already exists'
        });
      }
      const hashedPassword = bcrypt.hashSync(request.body.password, 10);

      staffModel.create({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        jobDescription: request.body.jobDescription,
        email: request.body.email,
        password: hashedPassword
      }).then((newUser: any) => {
        if (!newUser) {
          return response.status(500).json({
            message: 'Something bloody went wrong'
          });
        }
        return response.status(201).json({
          message: 'User created successfully',
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          jobDescription: newUser.jobDescription
        });
      });
    })
      .catch((error) => {
        return response.status(500).json({
          message: 'Error occurred here'
        });
      });
  }

  static staffSignin(request: Request, response: Response) {

    staffModel.findOne({ email: request.body.email }).then((foundUser: any) => {
      if (!foundUser) {
        return response.status(400).json({
          message: 'Invalid email or password.'
        });
      }

      const unHashedPassword = bcrypt
        .compareSync(request.body.password, foundUser.password);

      if (!unHashedPassword) {
        return response.status(400).json({
          message: 'Invalid email or password.'
        });
      }

      const token = generateToken(foundUser.id,
        foundUser.firstName, foundUser.lastName, foundUser.email);

      return response.status(200).json({
        message: 'Sign in successful.',
        token,
      });
    })
      .catch((error) => {
        return response.status(500).json({
          message: 'Something happened'
        });
      });
  }
}

export default StaffController;
