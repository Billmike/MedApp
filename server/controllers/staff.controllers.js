import bcrypt from 'bcrypt';
import staffModel from '../models/staff.model';
import validateSignUp from '../helpers/validateSignup.helpers';


class StaffController {
  static staffSignup(request, response) {
    const { error, valid } = validateSignUp(request.body);
    if (!valid) {
      return response.status(400).send(error);
    }
    staffModel.findOne({ email: request.body.email }).then((foundUser) => {
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
      }).then((newUser) => {
        if (!newUser) {
          return response.status(500).json({
            message: 'Something bloody went wrong'
          });
        }
        response.status(201).json({
          message: 'User created successfully',
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          jobDescription: newUser.jobDescription
        });
      });
    });
  }
}

export default StaffController;
