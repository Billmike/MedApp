process.env.NODE_ENV = 'development';

import express from 'express';
import mongoose from 'mongoose';
import dbKey from './config/config';
import staffRoute from './routes/staff.routes';
import patientRoute from './routes/patient.routes';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const app = express();
let mongoDB;

if (process.env.NODE_ENV === 'test') {
  mongoDB = dbKey.testDB;
} else if (process.env.NODE_ENV === 'development') {
  mongoDB = dbKey.localHost;
}


mongoose.connect(mongoDB);
(<any>mongoose).Promise = global.Promise;

const PORT = 5000;

const db = mongoose.connection;
db.on('error',
  console.error.bind(console, 'MONGODB connection failed in this instance'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/staff', staffRoute);
app.use('/patient', patientRoute);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});

export default app;
