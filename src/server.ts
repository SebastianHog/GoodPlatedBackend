import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { apiRouter } from './routes/routes';
import cookieParser from 'cookie-parser';

dotenv.config();

const connectionString: any = process.env.MONGO_CONNECTION_STRING;
const secretKey = process.env.SECRET_KEY;
const app = express();

const port: number = 3042;

const allowedOrigins = [
  'http://localhost:3000',
  'https://good-plates-nuxt3.vercel.app',
];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use('/api', apiRouter);

app.post('/test', async (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.listen(port, () => {
  console.log('Listening on port: ', port);
});

mongoose
  .connect(connectionString)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

mongoose.connection.on('connected', () =>
  console.log('Mongoose connected to db')
);
