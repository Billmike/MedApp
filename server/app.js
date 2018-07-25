import express from 'express';
import mongoose from 'mongoose';
import dbKey from './config/config';
import staffRoute from './routes/staff.routes';

const app = express();
const mongoDB = process.env.MONGODB_URI || dbKey.localHost;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const PORT = 5000;

const db = mongoose.connection;
db.on('error',
  console.error.bind(console, 'MONGODB connection failed in this instance'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/staff', staffRoute);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
