import mongoose from 'mongoose';

const DiagnosisSchema = new mongoose.Schema({
  diagnosis: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true
  },
  tests: {
    type: String,
    required: true
  },
  surgery: {
    type: String,
    required: true
  },
  patientID: {
    type: String,
    required: true
  }
});

export default mongoose.model('DiagnosisSchema', DiagnosisSchema);
