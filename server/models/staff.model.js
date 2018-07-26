import mongoose, { Schema } from 'mongoose';

const StaffSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
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

export default mongoose.model('StaffSchema', StaffSchema);
