process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import mongoose from 'mongoose';
import dbKey from '../../config/config';
import StaffModel from '../../models/staff.model';

describe('Tests for staff model', () => {
  before((done) => {
    mongoose.connect(dbKey.testDB);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error'));
    db.once('open', () => {
      console.log('We are connected to the test Database!');
      done();
    });
  });

  it('should save a new user into the database if all credentials are provided',
    (done) => {
      const newUser = new StaffModel({
        firstName: 'James',
        lastName: 'Bond',
        email: 'trial@gmail.com',
        jobDescription: 'Records staff',
        password: 'qwertyuiop'
      });

      newUser.save((err, response) => {
        expect(response).to.be.an('object');
        expect(response.firstName).to.equal('James');
        expect(response.lastName).to.equal('Bond');
        expect(response.email).to.equal('trial@gmail.com');
        done();
      });
    });

  it('should fail to save if no first name is provided', (done) => {
    const newUser = new StaffModel({
      lastName: 'Brian',
      email: 'tackle@gmail.com',
      jobDescription: 'doctor',
      password: 'qwertyuiop'
    });

    newUser.save((error) => {
      expect(error.errors.firstName.message)
        .to.equal('Path `firstName` is required.');
      done();
    });
  });

  it('should fail to save if no last name is provided', (done) => {
    const newUser = new StaffModel({
      firstName: 'John',
      email: 'john@gmail.com',
      jobDescription: 'staff',
      password: 'qwertyuiop'
    });

    newUser.save((error) => {
      expect(error.errors.lastName.message)
        .to.equal('Path `lastName` is required.');
      done();
    });
  });

  it('should fail to save if email is not provided', (done) => {
    const newUser = new StaffModel({
      firstName: 'James',
      lastName: 'Earl',
      jobDescription: 'Doctor',
      password: 'qwertyuiop'
    });

    newUser.save((error) => {
      expect(error.errors.email.message).to.equal('Path `email` is required.');
      done();
    });
  });

  it('should fail to create if job description is not provided', (done) => {
    const newUser = new StaffModel({
      firstName: 'Daniel',
      lastName: 'Ijekun',
      email: 'adewale@gmail.com',
      password: 'qwertyuiop'
    });

    newUser.save((error) => {
      expect(error.errors.jobDescription.message)
        .to.equal('Path `jobDescription` is required.');
      done();
    });
  });

  it('should fail to create if password is not provided', (done) => {
    const newUser = new StaffModel({
      firstName: 'David',
      lastName: 'Jones',
      email: 'dammy@gmail.com',
      jobDescription: 'daniella'
    });

    newUser.save((error) => {
      expect(error.errors.password.message)
        .to.equal('Path `password` is required.');
      done();
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});
