import { Schema } from 'mongoose';

const StaffSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
});
