import mongoose, { Schema } from 'mongoose';

const PatientSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 50
  },
  lastName: {
    type: String,
    required: true,
    max: 50
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  placeOfWork: {
    type: String
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  maritalStatus: {
    type: String,
    required: true
  },
  nextOfKin: {
    type: String,
    required: true
  },
  nextOfKinAddress: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  nextOfKinNumber: {
    type: Number,
    required: true
  },
  photograph: {
    type: String,
    required: true
  },
  healthInsuranceNumber: {
    type: String,
    required: true,
  }
});

export default mongoose.model('PatientSchema', PatientSchema);
