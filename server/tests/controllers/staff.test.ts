process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';
import dbKey from '../../config/config';

const request = supertest(app);
const staffSignup = '/staff/signup';
const staffSignin = '/staff/signin';

describe('Authentication test', () => {
  beforeAll((done) => {
    mongoose.connect(dbKey.testDB);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error'));
    db.once('open', () => {
      console.log('We are connected to the test Database!');
      done();
    });
  });

  const testUser = {
    firstName: 'Test',
    lastName: 'Mike',
    jobDescription: 'Doctor',
    password: 'qwertyuiop',
    email: 'john@gmail.com'
  };

  it('should create a new user when a user provides valid credentials',
    (done) => {
      request.post(staffSignup)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send(testUser)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.firstName).to.equal(testUser.firstName);
          expect(response.body.lastName).to.equal(testUser.lastName);
          expect(response.body.email).to.equal(testUser.email);
          expect(response.body.jobDescription)
            .to.equal(testUser.jobDescription);
          done();
        });
    });

  it('should fail to create a user if no first name is provided', (done) => {
    const copyTestUser = { ...testUser };
    copyTestUser.firstName = '';
    request.post(staffSignup)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .send(copyTestUser)
      .end((error, response) => {
        expect(response.body).to.be.an('array');
        expect(response.status).to.equal(400);
        expect(response.body[0].message)
          .to.equal('Please enter your first name.');
        done();
      });
  });

  it('should fail to create a user if last name is not provided', (done) => {
    const copyTestUser = { ...testUser };
    copyTestUser.lastName = '';
    request.post(staffSignup)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .send(copyTestUser)
      .end((error, response) => {
        expect(response.body).to.be.an('array');
        expect(response.body[0].message).to.equal('Please enter your last name.');
        expect(response.status).to.equal(400);
        done();
      });
  });

  it('should fail to create a user if the email is not provided', (done) => {
    const copyTestUser = { ...testUser };
    copyTestUser.email = '';
    request.post(staffSignup)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .send(copyTestUser)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body[0].message)
          .to.equal('Please enter a valid email address.');
        done();
      });
  });

  it('should throw an error if no job description is provided', (done) => {
    const copyTestUser = { ...testUser };
    copyTestUser.jobDescription = '';
    request.post(staffSignup)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .send(copyTestUser)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body[0].message)
          .to.equal('Your job description is required.');
        done();
      });
  });

  it('should fail to create the user if the email already exists in the application',
    (done) => {
      request.post(staffSignup)
        .set('Content-Type', 'application/json')
        .set('Connection', 'keep alive')
        .send(testUser)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('This user already exists');
          expect(response.status).to.equal(409);
          done();
        });
    });

  it('should signin a user that is already signed up', (done) => {
    request.post(staffSignin)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .send(testUser)
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.token).to.be.a('string');
        done();
      });
  });

  it('should fail to sign a user in who does not exist', (done) => {
    const trialUser = {
      email: 'testit@gmail.com',
      password: 'calamityp'
    };

    request.post(staffSignin)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .send(trialUser)
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.message)
          .to.equal('Invalid email or password.');
        done();
      });
  });

  afterAll((done) => {
    mongoose.connection.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});
