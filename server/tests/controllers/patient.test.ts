process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';
import dbKey from '../../config/config';

const request = supertest(app);
const patientSignup = '/patient/register';

describe('Patient schema tests', () => {
  beforeAll((done) => {
    mongoose.connect(dbKey.testDB);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error'));
    db.once('open', () => {
      console.log('We are connected to the test Database!');
      done();
    });
  });

  const testPatient = {
    firstName: 'Donald',
    lastName: 'Duke',
    address: 'Somewhere in festac',
    state: 'Ekiti',
    occupation: 'Drug lord',
    placeOfWork: 'Trap house',
    dateOfBirth: '2015-03-25',
    maritalStatus: 'Single',
    nextOfKin: 'Draymond Green',
    nextOfKinAddress: 'Somewhere in festac',
    relationship: 'Brother',
    nextOfKinNumber: '08130062207',
    phoneNumber: '08130062207',
    photograph: 'https://letsgomakesomemoney',
  };

  it('should sign up a new patient when all fields are provided', (done) => {
      request.post(patientSignup)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send(testPatient)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          done();
        });
  });

  afterAll((done) => {
    mongoose.connection.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});
